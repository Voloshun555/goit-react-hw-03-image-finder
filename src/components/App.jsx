import { Component } from 'react';
import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    inputValue: '',
    page: 1
  };

  

  getInputValue = element => {
    this.setState({
      inputValue: element,
    });
  };

  render() {
    return (
      <section className={css.App}>
        <Searchbar getInputValue={this.getInputValue} />
        <ImageGallery nameImage={this.state.inputValue} />
        <ToastContainer/>
      </section>
    );
  }
}

export default App;
