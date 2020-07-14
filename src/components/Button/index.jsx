import React from 'react';

import './Button.scss';

const Button = ({
  text = '',
  modifier= ''
}) => {
  return (
    <button className={`button ${modifier ? 'button--' + modifier : ''}`}>
      <span className="button__inner">{text}</span>
    </button>
  )
};

export default Button;