import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import imgApiService from '../../services/img-api.js';
import { ButtonSeeMore } from 'components/Button/Button';
import { toast } from 'react-toastify';
import {Loader} from 'components/Loader/Loader'

class ImageGallery extends Component {
  state = {
    image: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.nameImage;
    const nextName = this.props.nameImage;
    const page = this.props.page;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
     this.apiServicesName(nextName, page);
    }

    if (prevProps.page !== page && page > 1) {
      this.apiServicesPage(nextName, page);
    }
  }

   apiServicesPage = () => {
    const { nameImage, page } = this.props;
    imgApiService(nameImage, page)
      .then(data => {
        this.setState(prevState => ({
          status: 'resolved',
          image: [...prevState.image, ...data.hits],
        }));
      })
  };

  apiServicesName = () => {
    const { nameImage, page } = this.props;
    imgApiService(nameImage, page)
      .then(data => {
        this.setState({
          status: 'resolved',
          image: data.hits,
        });
      })
  };

  render() {
    const { image, status} = this.state;

    //     'idle'
    // 'pending'
    // 'resolved'
    // 'regected'

    if (status === 'idle') {
      return <h2 className={css.TitleIDLE}>Напишіть імя картинки</h2>;
    }

    if (status === 'pending') {
      return Loader();
    }

    if (status === 'regected') {
      return <div>Все погано</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {image.map(({ id, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem key={id} url={largeImageURL} tags={tags} />
              );
            })}
          </ul>
          <ButtonSeeMore onClick={this.props.nextPage} />
        </>
      );
    }
  }
}
export default ImageGallery;
