import React from 'react';
import styles from './Button.module.scss';
import proptypes from 'prop-types'

const Button = ({ type, BtnText, onClick }) => {
  return (
    <button onClick={onClick} className={styles.SearchFormButton} type={type}>
      {BtnText} <span className="buttonLabel">Search</span>
    </button>
  );
};
Button.propTypes = {
  type: proptypes.string,
  BtnText: proptypes.string,
  onClick: proptypes.func
}
export default Button;
