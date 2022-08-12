import React, { Component } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import proptypes from 'prop-types';
class Modal extends Component {
  state = {
    modalLargeImage: this.props.largeImage,
    modal: false,
  };

  componentDidUpdate(prevProps){
    if(prevProps.largeImage !== this.state.modalLargeImage){
      this.setState({
        modalLargeImage: this.props.largeImage,
        modal: true
      })
    }
  }
  // Як ви й просили, я переніс дві функії сюди, але так, як вони повинні працювати зі стейтами, то я й стейти переніс сюди( але там також залишив ).
  // Проблема в тому, що this.state.modalLargeImage не обновлюється зі зміною пропсів, і це потрібно робити через componentDidUpdate.
  // І при відкриванні воно працює правильно( хоч і з другого разу), але при закритті => знову спрацьовує componentDidUpdate і змінює modal на true, коли мені це не потрібно
  // Виходить що воно просто не закривається
  // Я ще використовував ComponentShouldUpdate але в мене нічого не вийшло, підскажіть будь-ласка, і вибачте за тупість
  onEspClick = e => {
    if (e.key === 'Escape') {
      this.setState({
        modalLargeImage: '',
        modal: false,
      });
    }
  };
  onOverlayClick = () => {
    this.setState({
      modalLargeImage: '',
      modal: false,
    });
    setTimeout(() => {
      console.log(this.state.modalLargeImage)
    }, 100);
  };
  render() {
    console.log(this.state.modalLargeImage)
    console.log(this.props.largeImage)
    const { largeImage } = this.props;
    const modalWindow = document.querySelector('#modal');
    window.addEventListener('keydown', this.onEspClick);
    const render = imageData => {
      return (
        <div className={styles.Overlay} onClick={this.onOverlayClick}>
          <div className={styles.Modal}>
            <img className={styles.largeImg} src={imageData} alt={imageData} />
          </div>
        </div>
      );
    };
    return this.state.modal && createPortal(render(largeImage), modalWindow);
  }
}
Modal.propTypes = {
  largeImage: proptypes.string,
  onOverlayClick: proptypes.func,
};
export default Modal;
