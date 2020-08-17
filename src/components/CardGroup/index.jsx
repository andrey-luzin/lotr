import React from 'react';

import Card from '../Card';

import CardType from 'constants/CardType';

import './CardGroup.scss';

const CardGroup = ({
  type,
  title,
  isOpened = false,
  isNewValue = false,
  isPrepared = false,
  list = [1] || [{}],
  role = null,
  hero = null,
  modifier = '',
  isActive = false
}) => {
  return (
    <div className={`card-group ${title ? 'h-label-parent' : ''} ${modifier ? modifier : ''}`}>
      {
        title &&
        <span className="h-hidden-label">{title}</span>
      }
      {
        list.map((listItem, index) => {
          const propsId =
            listItem.id && {
              id: +listItem.id
            };
          const propsItemTokens =
            (type === CardType.ITEM && listItem.tokens) && {
              itemTokens: +listItem.tokens
            };
            
          return (
            <Card
              key={`${index}${listItem.id ? `_${listItem.id}` : ''}`}
              type={
                `${type}${listItem.type && listItem.type !== CardType.CLOSED ? `-${listItem.type}` : ''}`
              }
              role={role}
              hero={hero}
              isOpened={
                isOpened || isPrepared || listItem.type === CardType.OPENED 
                  ? true
                  : false
              }
              isActive={isActive}
              isNewValue={isNewValue}
              {...propsId}
              {...propsItemTokens}
            />
            )
          }
        )
      }
    </div>
  );
};

export default CardGroup;