import React, { Component } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import proptypes from 'prop-types'
class Modal extends Component {
  render() {
    const { largeImage, onOverlayClick } = this.props;
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
Modal.propTypes = {
  largeImage: proptypes.string,
  onOverlayClick: proptypes.func,

}
export default Modal;
