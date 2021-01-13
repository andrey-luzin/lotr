import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';

import CardImage from './CardImage';

import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Counter from 'components/Counter';

import { store } from 'store/store';

import getOpenedType from 'utils/getOpenedType';
import getType from 'utils/getType';

import CardType from 'constants/CardType';
import { HeroesCollection } from 'constants/FirebaseConst';

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
  //preparedType?
}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const globalState = useContext(store);
  const { state } = globalState;
  const db = firebase.firestore();

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  
  /**
   * @param {string} sideType – тип карты в массивах карт потерь (closed, opened)
   */
  const getLossCard = (sideType) => {
    let card = {};
    db.collection(type).get().then(snapshot => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push(
          Object.assign(
            {docId: doc.id},
            doc.data()
          )
        );
      });
      card = list[Math.floor(Math.random() * list.length)];

      db.collection(type).doc(card.docId).delete().then(() => {
        const arrayObject = {id: card.id, type: sideType};
        db.collection(HeroesCollection).doc(state.firebaseId).update(
          type === CardType.DAMAGE ? {
            damage: firebase.firestore.FieldValue.arrayUnion(arrayObject)
          } : type === CardType.FEAR && {
            fear: firebase.firestore.FieldValue.arrayUnion(arrayObject)
          }
        )
      }).catch((error) => {
        console.error("Error removing card: ", error);
      });
    }).catch((error) => {
      console.error("Error gettind card: ", error);
    })
  };

  const getAdvantage = () => {
    db.collection(HeroesCollection).doc(state.firebaseId).update({
      advantages: firebase.firestore.FieldValue.arrayUnion({
        id: id
      })
    })
  };

  const discardCard = () => {
    if (type === CardType.DAMAGE || type === CardType.FEAR) {
      db.collection(`${type}-discard`).add({id: id}).then(() => {
        const arrayObject = {id: id, type: isOpened ? CardType.OPENED : CardType.CLOSED};

        db.collection(HeroesCollection).doc(state.firebaseId).update(
          type === CardType.DAMAGE ? {
            damage: firebase.firestore.FieldValue.arrayRemove(arrayObject)
          } : type === CardType.FEAR && {
            fear: firebase.firestore.FieldValue.arrayRemove(arrayObject)
          }
        );
      }).catch((error) => {
        console.error("Error discard card: ", error);
      });
    }

    if (type === CardType.ADVANTAGE) {
      db.collection(HeroesCollection).doc(state.firebaseId).update({
        advantages: firebase.firestore.FieldValue.arrayRemove({ id: id })
      })
    }
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
        (isOpened && !isNewValue && isModalOpen) &&
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
                <Button text="Скинуть" onClick={() => discardCard()} /> :
                <>
                  <Button text="Подготовить" />
                  <Button text="Наверх"/>
                  <Button text="Вниз" />
                </>
              }
            </ButtonGroup>
          }
          <CardImage source={isOpened ? getOpenedType(type, id, role, hero) : getType(type)} />
        </Modal>
      }
      {
        isActive &&
        <div className="card__inside">
          <ButtonGroup>
            {
              isOpened &&
              <Button
                text="Увеличить"
                modifier="inside"
                onClick={toggleModal}
              />
            }
            {
              !isOpened &&
              <Button text="Перевернуть" modifier="inside" />
            }
            {
              itemTokens > 0 &&
              <Counter value={itemTokens} modifier="inside" maxValue={2} />
            }
            {
              !isChecking ?
              <Button
                text="Скинуть"
                modifier="inside"
                onClick={() => discardCard()}
              /> :
              <>
                <Button text="Подготовить" modifier="inside" />
                <Button text="Наверх" modifier="inside" />
                <Button text="Вниз" modifier="inside" />
              </>
            }
          </ButtonGroup>
        </div>
      }
      {
        isNewValue &&
        <div className="card__inside">
          <ButtonGroup>
            {
              (type === CardType.DAMAGE || type === CardType.FEAR) &&
              <>
                <Button
                  text="Закрытый"
                  modifier="inside"
                  onClick={() => getLossCard('closed')}
                />
                <Button
                  text="Открытый"
                  modifier="inside"
                  onClick={() => getLossCard('opened')}
                />
              </>
            }
            {
              type === CardType.ADVANTAGE &&
              <Button
                text="Взять"
                modifier="inside"
                onClick={getAdvantage}
              />
            }
            {
             type === CardType.WEAKNESS &&
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