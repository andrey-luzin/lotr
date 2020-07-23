import React from 'react';

import './Button.scss';

const Button = ({
  text = '',
  modifier = '',
  className = ''
}) => {
  return (
    <button className={`button ${modifier ? 'button--' + modifier : ''} ${className ? className : ''}`}>
      <span className="button__inner">{text}</span>
    </button>
  )
};

export default Button;