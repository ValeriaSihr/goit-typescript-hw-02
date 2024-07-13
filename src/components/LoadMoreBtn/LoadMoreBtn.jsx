import css from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={css.loadMoreButton} onClick={onClick}>Load more</button>
  );
};

export default LoadMoreBtn;
