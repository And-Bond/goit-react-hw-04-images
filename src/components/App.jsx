import React, { Component } from 'react';
import Searchbar from './molecules/Searchbar/Searchbar';
import ImageGallery from './molecules/ImageGallery/ImageGallery';
import ImageGalleryItem from './molecules/ImageGalleryItem/ImageGalleryItem';
import Loader from './molecules/Loader/Loader';
import galleryFetch from '../api';

export class App extends Component {
  state = {
    inputValue: '',
    content: [],
    submitted: false,
  };
  onSubmit = (e, currentInputValue) => {
    e.preventDefault();
    this.setState({
      inputValue: currentInputValue
    });
    galleryFetch(this.state.inputValue).then(this.makeRender);
  };
  makeRender = content => {
    this.setState({
      content: content.hits,
      submitted: true,
    });
    setTimeout(() => {
      console.log(this.state.content);
    }, 1000);
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery content={this.state.content} />
      </>
    );
  }
}
