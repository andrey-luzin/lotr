import React from 'react';

import CardGroup from 'components/CardGroup';
import Counter from 'components/Counter';

import CardType from 'constants/CardType';
import CardName from 'constants/CardName';

import inspirationImage from './assets/imgs/inspiration.jpeg';

import './PlayerTablet.scss';

const PlayerTablet = ({
  roleId,
  heroId,
  hero,
  role,
  inspiration,
  maxInspiration,
  damage,
  fear,
  prepared,
  items
}) => {
  return (
    <div className="player-tablet">
      <div className="player-tablet__info">
        <header className="player-tablet__heading">
          <h1 className="player-tablet__hero">{hero}</h1>
          <span className="player-tablet__role">{role}</span>
        </header>
        <img
          src={`assets/cards/tablets/${heroId}.jpeg`}
          alt={heroId}
          className="player-tablet__hero-image"
        />
      </div>
      <div className="player-tablet__row player-tablet__row--states">
        <div className="player-tablet__inspiration-block h-label-parent">
          <span className="h-hidden-label">Воодушевление</span>
          <div className="player-tablet__inspiration-list">
            {
              [...Array(inspiration)].map((_, index) => (
                <img
                  key={index}
                  className="player-tablet__inspiration"
                  src={inspirationImage}
                  alt="Воодушевление"
                />
              ))
            }
          </div>
          <Counter value={inspiration} maxValue={maxInspiration}  />
        </div>
        {
          damage.length &&
          <CardGroup
            title={CardName.DAMAGE}
            type={CardType.DAMAGE}
            list={damage}
          />
        }
        {
          fear.length &&
          <CardGroup
            type={CardType.FEAR}
            title={CardName.FEAR}
            list={fear}
          />
        }
      </div>
      <div className="player-tablet__row player-tablet__row--prepared">
        {
          prepared.length &&
          <CardGroup
            title={CardName.PREPARED}
            type={CardType.PREPARED}
            list={prepared}
            isOpened={true}
            role={roleId}
            hero={heroId}
            isPrepared={true}
          />
        }
        {
          items.length &&
          <CardGroup 
            title={CardName.ITEM}
            type={CardType.ITEM}
            list={items}
            isOpened={true}
          />
        }
      </div>
    </div>
  )
}

export default PlayerTablet;