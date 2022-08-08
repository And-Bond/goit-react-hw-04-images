import React, { Component } from 'react';
import Searchbar from './molecules/Searchbar/Searchbar';
import ImageGallery from './molecules/ImageGallery/ImageGallery';
import ImageGalleryItem from './molecules/ImageGalleryItem/ImageGalleryItem';
import Loader from './molecules/Loader/Loader';
import galleryFetch from '../api';
import Modal from './organism/Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    content: [],
    submitted: false,
    modal: false,
    modalSrcOfImage: '',
    modalLargeImage: '',
    loader: false,
    pageNumber: 1,
    pageAmount: 12
  };
  onSubmit = (e, currentInputValue) => {
    e.preventDefault();
    this.setState({
      inputValue: currentInputValue,
      loader: true
    });

     setTimeout(() => {
      galleryFetch(this.state.inputValue, this.state.pageNumber, this.state.pageAmount).then(this.makeRender);
      this.setState((prevState) => {return {
        pageNumber: prevState.pageNumber + 1,
        pageAmount: prevState.pageAmount + 12
      }})
     }, 100)
  };
  makeRender = content => {
    this.setState({
      content: content.hits,
      submitted: true,
      loader: false
    });
    setTimeout(() => {
      console.log(content)
    }, 1000)
  };
  onModalClick = (e, largeImage) => {
    this.setState({
      modalSrcOfImage: e.target.src,
      modalLargeImage: largeImage,
      modal: true
    })
  }
  onOverlayClick = () => {
    this.setState({
      modalSrcOfImage: '',
      modalLargeImage: '',
      modal: false
    })
  }
  onEspClick= (e) => {
    if(e.key === 'Escape'){
      this.setState({
        modalSrcOfImage: '',
        modalLargeImage: '',
        modal: false
      })
    }
  }
  onLoadMoreClick = (e) => {
    this.onSubmit(e, this.state.currentInputValue)
  }
  render() {
    document.body.classList.add('App')
    window.addEventListener('keydown', this.onEspClick)
    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        {this.state.loader ? <Loader /> : <ImageGallery pageAmount={this.state.pageAmount} onLoadMoreClick={this.onLoadMoreClick} onClick={this.onModalClick} content={this.state.content} />}
        {this.state.modal && <Modal largeImage={this.state.modalLargeImage} onEspClick={this.onEspClick} onOverlayClick={this.onOverlayClick}></Modal>}
      </>
    );
  }
}
