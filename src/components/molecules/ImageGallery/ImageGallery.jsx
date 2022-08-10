import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.scss';
import proptypes from 'prop-types'
class ImageGallery extends Component {
  render() {
    const { content, onClick, onLoadMoreClick, submitted } = this.props;
    return (
        <>
      <ul className={styles.ImageGallery}>
        {submitted && content.length === 0 ? <h1>Please enter valid value</h1> : 
        content?.flatMap(({ previewURL, tags, id, largeImageURL }) => {
          return (
            <>
              <ImageGalleryItem
                onClick={onClick}
                imageSrc={previewURL}
                largeSrc={largeImageURL}
                imageAlt={tags}
                key={id.toString()}
              />
              
            </>
          );
        })}
      </ul>
      {content.length > 0 ? <button className={styles.Button} type="click" onClick={onLoadMoreClick}>Load more</button> : null}
      </>
    );
  }
}
ImageGallery.propTypes = {
  content: proptypes.array,
  onClick: proptypes.func,
  onLoadMoreClick: proptypes.func,
  submitted: proptypes.bool
}
export default ImageGallery;
