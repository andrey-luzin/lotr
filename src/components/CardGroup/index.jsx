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
  modifier = ''
}) => {
  return (
    <div className={`card-group ${title ? 'h-label-parent' : ''} ${modifier ? modifier : ''}`}>
      {
        title &&
        <span className="h-hidden-label">{title}</span>
      }
      {
        type === CardType.ITEM ?
        list.map((listItem, index) => 
          <Card
            id={+listItem.id}
            key={`${index}_${listItem.id}`}
            type={type}
            role={role}
            hero={hero}
            isOpened={isOpened}
            itemTokens={+listItem.tokens}
          />
        )
        :
        // If contains objects
        list.some(group => typeof group === 'object') ?
        (
          list
          .map(group => group.cards.map((listItem, index) => 
              <Card
                id={+listItem}
                key={`${index}_${listItem}`}
                // If not opened, then add group type
                type={
                  `${type}${group.type === CardType.CLOSED ? '' : `-${group.type}`}`
                }
                role={role}
                hero={hero}
                isOpened={(isPrepared || group.type === CardType.OPENED) ? true : false}
              />
          ))
        ) : 
        list.map((listItem, index) => 
          <Card
            id={+listItem}
            key={`${index}_${listItem}`}
            type={type}
            role={role}
            hero={hero}
            isOpened={isOpened}
            isNewValue={isNewValue}
          />
        )
      }
    </div>
  )
};

export default CardGroup;