import React from 'react';

import Card from 'components/Card';
import Button from 'components/Button';

import CardType from 'constants/CardType';
import StateType from 'constants/StateType';

import './Checking.scss';

const Checking = ({
  roleId,
  heroId,
  hero,
  role,
  deck = [],
  state
}) => {
  return (
    <div className="checking">
      {
        StateType[state.toUpperCase()] &&
        <div className="checking__info">
          {hero} делает {StateType[state.toUpperCase()].genitive}
          <Button text="Готово" className="checking__done" />
        </div>
      }
      <div className="checking__cards-list">
        {
          deck.map((listItem, index) => 
            <Card
              id={+listItem.id}
              key={`${index}_${listItem.id}`}
              type={`${CardType.PREPARED}-${listItem.type}`}
              role={roleId}
              hero={heroId}
              isOpened={true}
              isChecking={true}
            />
          )
        }
      </div>
    </div>
  )
};

export default Checking;

