import Modal from 'react-modal';
import css from './ImageModal.module.css'

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <div>
    <Modal className={css.modalWindow} isOpen={true} onRequestClose={onClose} overlayClassName={css.overlay}>
        <button className={css.modalBtn} onClick={onClose}>X</button>
        <img className={css.modalImage} src={image.urls.regular} alt={image.alt_description} width={600} height={500} />
        <p >{image.description}</p>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>      
      </Modal>
      </div>
  );
};

export default ImageModal;
