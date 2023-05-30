import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import imgApiService from '../../services/img-api.js';
import { ButtonSeeMore } from 'components/Button/Button';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';

class ImageGallery extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    nameImage: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    image: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }).isRequired
    ),
  };

  state = {
    image: [],
    status: 'idle',
    showButton: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.nameImage;
    const nextName = this.props.nameImage;

    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      try {
        const apiImage = await imgApiService(nextName, nextPage);
        if (apiImage.totalHits === 0) {
          toast.warning(`Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз`)
        }

        if (apiImage.hits.length > 0) {
          this.setState({
            showButton: true,
          });
        }
        if (nextPage * 12 > apiImage.totalHits) {
          this.setState({
            showButton: false,
          });
        }

        this.setState({
          status: 'resolved',
          image: apiImage.hits,
        });
      } catch (error) {
        toast.error(`Вибачте щось пішло не так. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }

    try {
      if (prevPage !== nextPage && nextPage > 1) {
        const apiImage = await imgApiService(nextName, nextPage);

        if (nextPage * 12 > apiImage.totalHits) {
          this.setState({
            showButton: false,
          });
        }
        this.setState(prevState => ({
          image: [...prevState.image, ...apiImage.hits],
        }));
      }
    } catch (error) {
      toast.error(`Вибачте щось пішло не так. ${error.message}`);
      this.setState({ status: 'rejected' });
    }
  }

  render() {
    const { image, status, showButton } = this.state;

    if (status === 'idle') {
      return <h2 className={css.TitleIDLE}>Напишіть імя картинки</h2>;
    }

    if (status === 'pending') {
      return Loader();
    }

    if (status === 'regected') {
      return <div>Щось пішло не так</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {image.map(({ id, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  url={largeImageURL}
                  tags={tags}
                  onClick={this.props.onClickModal}
                />
              );
            })}
          </ul>
          {showButton && <ButtonSeeMore onClick={this.props.nextPage} />}
        </>
      );
    }
  }
}
export default ImageGallery;
