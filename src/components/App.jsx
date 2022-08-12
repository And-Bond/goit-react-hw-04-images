import React, { Component } from 'react';
import Searchbar from './molecules/Searchbar/Searchbar';
import ImageGallery from './molecules/ImageGallery/ImageGallery';
import Loader from './molecules/Loader/Loader';
import galleryFetch from '../api';
import Modal from './organism/Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    content: [],
    submitted: false,
    modal: false,
    modalLargeImage: '',
    loader: false,
    pageNumber: 1,
  };
  onSubmit = (e, currentInputValue) => {
    e.preventDefault();
    this.setState({
      inputValue: currentInputValue,
      loader: true,
    });

    setTimeout(() => {
      galleryFetch(
        this.state.inputValue,
        this.state.pageNumber,
        12
      ).then(this.makeRender);
      this.setState(prevState => {
        return {
          pageNumber: prevState.pageNumber + 1,
        };
      });
    }, 100);
  };
  makeRender = content => {
    this.setState({
      content: content.hits,
      submitted: true,
      loader: false,
    });
  };
  onModalClick = ( largeImage) => {
    this.setState({
      modalLargeImage: largeImage,
      modal: true
    });
    setTimeout(() => {
      console.log(this.state.modalLargeImage)
    }, 100)
  };
  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1, loader: true };
    });
    setTimeout(() => {
      galleryFetch(
        this.state.inputValue,
        this.state.pageNumber,
        12
      ).then(({hits}) => {
        this.setState({
          content: [...this.state.content, ...hits]
        })
      })
        .finally(this.setState({ loader: false }));
    }, 100);
  };

 

  render() {
    
    return (
      <div className='App'>
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
          <Modal
            largeImage={this.state.modalLargeImage}
            onEspClick={this.onEspClick}
            onOverlayClick={this.onOverlayClick}
            modal={this.state.modal}
           />
        
      </div>

    );
  }
}
