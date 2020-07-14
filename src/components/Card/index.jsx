import React, { useState } from 'react';

import Modal from 'components/Modal';

import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

import CardType from 'constants/CardType';

import damage from 'assets/imgs/cards/damage.jpeg';
import fear from 'assets/imgs/cards/fear.jpeg';
import base from 'assets/imgs/cards/base.jpeg';

import './Card.scss';

/**
 * @param {string} type
 */
const getType = (type) => {
  switch(type) {
    case CardType.DAMAGE:
      return damage;
    case CardType.FEAR:
      return fear;
    case CardType.PREPARED:
      return base;
    case CardType.ITEM:
      return base;
    default:
      return base;
  }
}

/**
 * @param {string} type
 * @param {number} id
 * @param {string} role
 * @param {string} hero
 */
const getOpenedType = (type, id, role, hero) => {
  switch(type) {
    case CardType.DAMAGE_OPENED:
      return `assets/cards/damages/${id}.jpeg`;
    case CardType.DAMAGE_CLOSED:
      return `assets/cards/damages/${id}.jpeg`;
    case CardType.FEAR:
      return `assets/cards/fears/${id}.jpeg`;
    case CardType.PREPARED_BASE:
      return `assets/cards/basic/${id}.jpeg`;
    case CardType.PREPARED_HERO:
      return `assets/cards/heroes/${hero}/${id}.jpeg`;
    case CardType.PREPARED_ROLE:
      return `assets/cards/classes/${role}/${id}.jpeg`;
    case CardType.ITEM:
      return `assets/cards/items/${id}.jpeg`;
    default:
      return base;
  }
}

const CardImage = ({source, onClick = null}) => (
  <img
    className="card__wrapper"
    src={source}
    alt=""
    onClick={onClick}
  />
);

/**
 * @property {string} type Тип карты, определяет обложку и действия, которые можно делать с картой.
 * @property {boolean} isOpened Открытая или закрытая карта
 * @property {boolean} isNewValue Карта из планшета утилит, которая возметься в планшет игрока (всегда закрытая).
 */
const Card = ({
  type,
  id,
  role = null,
  hero = null,
  isOpened = false,
  isNewValue = false
}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  
  return (
    <div className={`card ${!isOpened ? 'card--isClosed' : ''}`}>
      {
        (isOpened && isModalOpen) &&
        <Modal onRequestClose={toggleModal}>
          <ButtonGroup>
            <Button text="Скинуть" />
          </ButtonGroup>
          <CardImage
            source={isOpened ? getOpenedType(type, id, role, hero) : getType(type)}
          />
        </Modal>
      }
      {
        (!isOpened && !isNewValue) &&
        <div className="card__inside">
          <ButtonGroup>
            <Button text="Перевернуть" modifier="inside" />
            <Button text="Скинуть" modifier="inside" />
          </ButtonGroup>
        </div>
      }
      {
        (isNewValue && !isOpened) &&
        <div className="card__inside">
          <ButtonGroup>
            {
              (type === CardType.DAMAGE || type === CardType.FEAR) &&
              <>
                <Button text="Закрытый" modifier="inside" />
                <Button text="Открытый" modifier="inside" />
              </>
            }
            {
              type === CardType.INTELLIGANCE &&
              <Button text="Провести разведку" modifier="inside" />
            }
            {
              (type === CardType.ADVANTAGE || type === CardType.WEAKNESS) &&
              <Button text="Взять" modifier="inside" />
            }
          </ButtonGroup>
        </div>
      }
      <CardImage
        source={isOpened ? getOpenedType(type, id, role, hero) : getType(type)}
        onClick={toggleModal}
      />
    </div>
  )
};

export default Card;