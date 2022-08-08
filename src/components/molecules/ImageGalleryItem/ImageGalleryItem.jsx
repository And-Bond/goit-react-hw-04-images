import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const  {imageSrc, imageAlt, key} = this.props
    return (
      <li key={key} className="galleryItem">
        <img src={imageSrc} alt={imageAlt}  />
      </li>
    );
  }
}

export default ImageGalleryItem;
