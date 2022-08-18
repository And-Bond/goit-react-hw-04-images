import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import proptypes from 'prop-types';

const Modal = ({ largeImage, onOverlayClick,onEspClick }) => {
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onEspClick()
   }
  },[onEspClick])
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {window.removeEventListener('keydown', onKeyDown)}
  },[onKeyDown])

  const render = imageData => {
    return (
      <div
        className={styles.Overlay}
        onClick={() => onOverlayClick()}
      >
        <div className={styles.Modal}>
          <img className={styles.largeImg} src={imageData} alt={imageData} />
        </div>
      </div>
    );
  };
  const modalWindow = document.querySelector('#modal');
  return createPortal(render(largeImage), modalWindow);
};

// class Modal extends Component {

// componentDidMount(){
//   window.addEventListener('keydown', this.onKeyDown);
// }
// componentWillUnmount(){
//   window.removeEventListener('keydown', this.onKeyDown)
// }
// onKeyDown = (e) => {
//   if (e.key === 'Escape') {
//     this.props.onEspClick()
//  }
// }

//   render() {
//     const { largeImage } = this.props;
//     const modalWindow = document.querySelector('#modal');

//     const render = imageData => {
//       return (
//         <div className={styles.Overlay} onClick={() =>  this.props.onOverlayClick()}>
//           <div className={styles.Modal}>
//             <img className={styles.largeImg} src={imageData} alt={imageData} />
//           </div>
//         </div>
//       );
//     };
//     return  createPortal(render(largeImage), modalWindow);
//   }
// }
Modal.propTypes = {
  largeImage: proptypes.string,
  onOverlayClick: proptypes.func,
};
export default Modal;
