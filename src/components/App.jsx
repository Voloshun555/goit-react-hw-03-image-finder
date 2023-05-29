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

  nextPage = () => {
    this.setState(prevState =>({
      page: prevState.page + 1
    }))
  }

  getInputValue = element => {
    this.setState({
      inputValue: element, page: 1
    });
  };

  render() {
    return (
      <section className={css.App}>
        <Searchbar getInputValue={this.getInputValue} />
        <ImageGallery nameImage={this.state.inputValue} nextPage={this.nextPage} page={this.state.page} />
        <ToastContainer/>
      </section>
    );
  }
}

export default App;
