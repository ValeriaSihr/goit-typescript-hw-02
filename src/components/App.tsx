import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import { fetchImages, ImageData } from './api';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchImages(query, page);
      setImages(prevImages => [...prevImages, ...data.results]);
      setTotalResults(data.total);
    } catch (error) {
      setError('Failed to fetch images');
      toast.error('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      loadImages();
    }
  }, [query, page, loadImages]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalResults(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (image: ImageData) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && images.length < totalResults && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && <ImageModal image={modalImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;

