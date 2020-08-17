import React from 'react';

const CardImage = ({ source }) => (
  <img
    className='card__wrapper'
    src={source}
    alt=""
  />
);

export default CardImage;