import React from 'react';
import styles from './Button.module.scss';

const Button = ({ type, BtnText, className, onClick }) => {
  return (
    <button onClick={onClick} className={styles.SearchFormButton} type={type}>
      {BtnText} <span className="button-label">Search</span>
    </button>
  );
};

export default Button;
