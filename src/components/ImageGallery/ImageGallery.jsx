import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import imgApiService from '../../services/img-api.js';

class ImageGallery extends Component {
  state = {
    image: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.nameImage;
    const nextName = this.props.nameImage;
    if (prevName !== nextName) {
       imgApiService(nextName).then(data => {
        this.setState({
          image: data.hits,
        });
      });
    }
  }

  render() {
    const { image } = this.state;

    return (
      <ul className={css.ImageGallery}>
        {image.map(({ id, largeImageURL, tags }) => {
          return <ImageGalleryItem key={id} url={largeImageURL} tags={tags} />;
        })}
      </ul>
    );
  }
}
export default ImageGallery;
