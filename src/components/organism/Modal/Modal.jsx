import React, { Component } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
class Modal extends Component {
  render() {
    const { largeImage, onOverlayClick, onEspClick } = this.props;
    const modalWindow = document.querySelector('#modal');
    const render = imageData => {
      return (
        <div className={styles.Overlay}  onClick={onOverlayClick} >
          <div className={styles.Modal}>
            <img
              className={styles.largeImg}
              src={imageData}
              alt={imageData}
            />
          </div>
        </div>
      );
    };
    return createPortal(render(largeImage), modalWindow);
  }
}

export default Modal;
