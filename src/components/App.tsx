import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import { fetchImages, ImageData } from './api';

interface AppState {
  images: ImageData[];
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
  totalResults: number;
  modalImage: ImageData | null;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    images: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    totalResults: 0,
    modalImage: null,
  });

  const { images, loading, error, query, page, totalResults, modalImage } = state;

  const loadImages = useCallback(async () => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await fetchImages(query, page);
      setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...data.results],
        totalResults: data.total,
      }));
    } catch (error) {
      setState(prevState => ({ ...prevState, error: 'Failed to fetch images' }));
      toast.error('Failed to fetch images');
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      loadImages();
    }
  }, [query, page, loadImages]);

  const handleSearch = (newQuery: string) => {
    setState({
      ...state,
      query: newQuery,
      images: [],
      page: 1,
      totalResults: 0,
    });
  };

  const handleLoadMore = () => {
    setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  const handleImageClick = (image: ImageData) => {
    setState(prevState => ({ ...prevState, modalImage: image }));
  };

  const handleCloseModal = () => {
    setState(prevState => ({ ...prevState, modalImage: null }));
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
