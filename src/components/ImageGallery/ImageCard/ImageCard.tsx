import css from './ImageCard.module.css';
import { ImageData } from '../../api';

interface ImageCardProps {
  image: ImageData;
  onClick: (image: ImageData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={() => onClick(image)}>
      <img src={image.urls.regular} alt={image.alt_description} className={css.cardsImage} />
     </div>
  );
};

export default ImageCard;
