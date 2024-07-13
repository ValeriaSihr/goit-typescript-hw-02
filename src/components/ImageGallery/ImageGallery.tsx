import css from './ImageGallery.module.css';
import ImageCard from './ImageCard/ImageCard';
import { ImageData } from '../api';

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.cardList}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
