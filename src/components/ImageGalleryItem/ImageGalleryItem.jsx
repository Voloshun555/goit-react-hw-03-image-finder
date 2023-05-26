import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({url, tag}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.img} src={url} alt={tag} />
    </li>
  );
};
