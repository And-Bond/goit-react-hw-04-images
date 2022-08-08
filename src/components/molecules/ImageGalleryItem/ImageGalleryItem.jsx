import React, { Component } from 'react';
import styles from './ImageGallryItem.module.scss'

class ImageGalleryItem extends Component {
  render() {
    const  {imageSrc, imageAlt, key, onClick ,largeSrc} = this.props
    return (
      <li key={key} className={styles.ImageGalleryItem} onClick={(e) =>onClick(e,largeSrc)}>
        <img className={styles.ImageGalleryItemImage} src={imageSrc}  alt={imageAlt}  />
      </li>
    );
  }
}

export default ImageGalleryItem;
