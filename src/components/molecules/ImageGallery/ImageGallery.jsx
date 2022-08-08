import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    const { content } = this.props;
    return (
      <ul className="gallery">
        {content.map(({ previewURL, tags, id }) => {
          return (
            <ImageGalleryItem imageSrc={previewURL} imageAlt={tags} key={id} />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
