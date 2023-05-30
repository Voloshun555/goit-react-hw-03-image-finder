import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({url, tags, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} >
      <img className={css.img} src={url} alt={tags} onClick={() => onClick(url, tags)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
