import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';

import CardImage from './CardImage';

import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Counter from 'components/Counter';

import useLossCollection from 'hooks/useLossCollection';

import getOpenedType from 'utils/getOpenedType';
import getType from 'utils/getType';

import CardType from 'constants/CardType';
import { DamageCollection } from 'constants/FirebaseConst';

import './Card.scss';

/**
 * @property {string} type Тип карты, определяет обложку и действия, которые можно делать с картой.
 * @property {boolean} isOpened Открытая или закрытая карта.
 * @property {boolean} isNewValue Карта из планшета утилит, которая возметься в планшет игрока (всегда закрытая).
 * @property {number} itemTokens Если у карты вещи есть токены, передается их количество.
 */
const Card = ({
  type,
  id,
  role = null,
  hero = null,
  isOpened = false,
  isNewValue = false,
  isChecking = false,
  itemTokens = 0,
  isActive = false
}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const db = firebase.firestore();

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const handleDamageCard = () => {
    let card = 0;
    db.collection(DamageCollection).get().then(snapshot => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      card = list[Math.floor(Math.random() * list.length)];
    }).catch((error) => {
      console.log(error);
    })
  };
  
  return (
    <div
      className={`
        card ${!isOpened ? 'card--isClosed' : ''} ${itemTokens ? 'card--isCounted' : ''} ${isActive ? 'card--isActive' : ''}
      `}
      data-tokens={itemTokens ? itemTokens : ''}
      onClick={!isActive ? toggleModal : null}
    >
      {
        (isOpened && isModalOpen) &&
        <Modal onRequestClose={toggleModal}>
          {
            isActive &&
            <ButtonGroup>
              {
                itemTokens > 0 &&
                <Counter value={itemTokens} />
              }
              {
                !isChecking ?
                <Button text="Скинуть" /> :
                <>
                  <Button text="Подготовить" />
                  <Button text="Наверх"/>
                  <Button text="Вниз" />
                </>
              }
            </ButtonGroup>
          }
          <CardImage
            source={isOpened ? getOpenedType(type, id, role, hero) : getType(type)}
          />
        </Modal>
      }
      {
        isActive &&
        <div className="card__inside">
          <ButtonGroup>
            {
              !isOpened &&
              <>
                {
                  (type === CardType.DAMAGE || type === CardType.FEAR) &&
                  <Counter value={2} modifier="inside" />
                }
                <Button text="Перевернуть" modifier="inside" />
              </>
            }
            {
              itemTokens > 0 &&
              <Counter value={itemTokens} modifier="inside" maxValue={2} />
            }
            {
              !isChecking ?
              <Button text="Скинуть" modifier="inside" /> :
              <>
                <Button text="Подготовить" modifier="inside" />
                <Button text="Наверх" modifier="inside" />
                <Button text="Вниз" modifier="inside" />
              </>
            }
            {
              isOpened &&
              <Button
                text="Увеличить"
                modifier="inside"
                onClick={toggleModal}
              />
            }
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
                <Button text="Закрытый" modifier="inside" onClick={handleDamageCard} />
                <Button text="Открытый" modifier="inside" onClick={handleDamageCard} />
              </>
            }
            {
              (type === CardType.ADVANTAGE || type === CardType.WEAKNESS) &&
              <Button text="Взять" modifier="inside" />
            }
          </ButtonGroup>
        </div>
      }
      <CardImage source={isOpened ? getOpenedType(type, id, role, hero) : getType(type)} />
    </div>
  )
};

export default Card;