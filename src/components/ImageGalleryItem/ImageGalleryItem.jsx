import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <li className={css.galleryItem} onClick={onClick} key={id}>
      <img className={css.galleryItemImage} src={src} alt={alt} />
    </li>
  );
};
