import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({
  text = '',
  modifier = '',
  className = '',
  onClick = () => null,
  isActive = true
}) => {
  return (
    <button
      className={`button ${modifier ? 'button--' + modifier : ''} ${className ? className : ''}`}
      onClick={onClick}
      disabled={!isActive}
    >
      <span className="button__inner">{text}</span>
    </button>
  )
};

export default Button;