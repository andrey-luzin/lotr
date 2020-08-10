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
        list.map((listItem, index) => 
          <Card
            id={+listItem.id}
            key={`${index}_${listItem.id}`}
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
            itemTokens={
              type === CardType.ITEM && listItem.tokens
              ? +listItem.tokens
              : 0
            }
            isActive={isActive}
          />
        )
      }
    </div>
  );
};

export default CardGroup;