import React from 'react';

import './Button.scss';

const Button = ({
  text = '',
  modifier= ''
}) => {
  return (
    <button className={`button ${modifier ? 'button--' + modifier : ''}`}>
      {text}
    </button>
  )
};

export default Button;