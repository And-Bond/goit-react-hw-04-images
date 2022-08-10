import React, { Component } from 'react';
import styles from './ImageGallryItem.module.scss'
import proptypes from 'prop-types'

class ImageGalleryItem extends Component {
  render() {
    const  {imageSrc, imageAlt,  onClick ,largeSrc, key} = this.props
    return (
      <li key={key}  className={styles.ImageGalleryItem} onClick={(e) =>onClick(e,largeSrc)}>
        <img className={styles.ImageGalleryItemImage} src={imageSrc}  alt={imageAlt}  />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  imageSrc: proptypes.string,
  imageAlt: proptypes.string,
  onClick: proptypes.func,
  largeSrc: proptypes.string,
  id: proptypes.number
}
export default ImageGalleryItem;
