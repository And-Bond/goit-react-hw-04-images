import React, { Component } from 'react';
import Searchbar from './molecules/Searchbar/Searchbar';
import ImageGallery from './molecules/ImageGallery/ImageGallery';
import Loader from './molecules/Loader/Loader';
import galleryFetch from '../api';
import Modal from './organism/Modal/Modal';

export class App extends Component {
  state = {
    content: [],
    submitted: false,
    modal: false,
    modalLargeImage: '',
    loader: false,
    pageNumber: 1,
    inputValue: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      return galleryFetch(
        this.state.inputValue,
        this.state.pageNumber,
        12
      ).then(this.makeRender);
    }
  }
  onSubmit = (e, currentInputValue) => {
    e.preventDefault();
    this.setState({
      loader: true,
      inputValue: currentInputValue,
    });
  };
  makeRender = content => {
    if (this.state.pageNumber === 1) {
      this.setState({ content: content.hits, submitted: true, loader: false });
    } else {
      this.setState((prevState) => {
        return { content: [...prevState.content,...content.hits], submitted: true, loader: false };
      });
    }
  };
  onModalClick = largeImage => {
      this.setState({
        modalLargeImage: largeImage,
        modal: true,
      });
  };
  onEspClick = () => {
      this.setState({
        modalLargeImage: '',
        modal: false,
      });
  };
  onOverlayClick = () => {
    this.setState({
      modalLargeImage: '',
      modal: false,
    });
  };
  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };


  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.loader ? (
          <Loader />
        ) : (
          <ImageGallery
            onLoadMoreClick={this.onLoadMoreClick}
            onClick={this.onModalClick}
            content={this.state.content}
            submitted={this.state.submitted}
          />
        )}
        {this.state.modal && (
          <Modal
            largeImage={this.state.modalLargeImage}
            onEspClick={this.onEspClick}
            onOverlayClick={this.onOverlayClick}
            modal={this.state.modal}
          />
        )}
      </div>
    );
  }
}
