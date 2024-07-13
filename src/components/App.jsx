import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery'
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import { fetchImages } from './api';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchImages(query, page);
      setImages(prev => [...prev, ...data.results]);
      setTotalResults(data.total);  // Зберігаємо загальну кількість результатів
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

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalResults(0); // Скидаємо загальну кількість результатів
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleImageClick = (image) => {
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