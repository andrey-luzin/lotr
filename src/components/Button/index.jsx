import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({
  text = '',
  modifier = '',
  className = '',
  onClick = () => null
}) => {
  return (
    <button
      className={`button ${modifier ? 'button--' + modifier : ''} ${className ? className : ''}`}
      onClick={onClick}
    >
      <span className="button__inner">{text}</span>
    </button>
  )
};

export default Button;