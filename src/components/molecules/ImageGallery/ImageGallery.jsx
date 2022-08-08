import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/atoms/Button/Button';
import styles from './ImageGallery.module.scss';
class ImageGallery extends Component {
  render() {
    const { content, onClick, onLoadMoreClick } = this.props;
    return (
        <>
      <ul className={styles.ImageGallery}>
        {content.map(({ previewURL, tags, id, largeImageURL }) => {
          return (
            <>
              <ImageGalleryItem
                onClick={onClick}
                imageSrc={previewURL}
                largeSrc={largeImageURL}
                imageAlt={tags}
                key={id}
              />
              
            </>
          );
        })}
      </ul>
      <button className={styles.Button} type="click" onClick={onLoadMoreClick}>Load more</button>
      </>
    );
  }
}

export default ImageGallery;
