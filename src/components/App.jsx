import { Component } from 'react';
import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    tags: '',
    imageUrl: '',
    inputValue: '',
    page: 1,
    showModal: false,
  };

  getImageTags = (url, tags) => {
    this.toggleModal();
    this.setState({
      imageUrl: url,
      tags: tags
    });
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getInputValue = element => {
    this.setState({
      inputValue: element,
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, imageUrl, tags  } = this.state;
    return (
      <section className={css.App}>
        <Searchbar getInputValue={this.getInputValue} />
        <ImageGallery
          nameImage={this.state.inputValue}
          nextPage={this.nextPage}
          page={this.state.page}
          onClickModal={this.getImageTags}
        />
        {showModal && <Modal url={imageUrl} tags={tags} onClose={this.toggleModal} />}

        <ToastContainer />
      </section>
    );
  }
}

export default App;
