import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import {
  IfFirebaseAuthed
} from "@react-firebase/auth";

import CardGroup from 'components/CardGroup';
import Counter from 'components/Counter';
import Button from 'components/Button';

import CardType from 'constants/CardType';
import CardName from 'constants/CardName';
import context from 'constants/Context';
import { HeroesCollection } from 'constants/FirebaseConst';
import usePlayer from 'hooks/usePlayer';

import { store } from 'store/store.js';

import { SET_FIREBASE_ID, SET_PLAYER } from 'constants/Actions';

import { ReactComponent as Arrow } from 'assets/imgs/arrow.svg';
import inspirationImage from 'assets/imgs/inspiration.jpeg';

import './PlayerTablet.scss';

const PlayerTablet = ({
  id,
  roleId,
  heroId,
  hero,
  role,
  inspiration,
  maxInspiration,
  damage = [],
  fear = [],
  prepared = [],
  items = []
}) => { 
  const isPlayer = usePlayer(heroId);
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const db = firebase.firestore();

  const handleOut = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem(context.heroId);
      dispatch({ type: SET_PLAYER, payload: null });
      dispatch({ type: SET_FIREBASE_ID, payload: null });
    });
  }

  const handleInspirationChange = (number) => {
    db.collection(HeroesCollection).doc(id).update({
      inspiration: number
    })
  }

  return (
    <div className="player-tablet">
      <div className="player-tablet__info">
        <header className="player-tablet__heading">
          {
            isPlayer &&
            <IfFirebaseAuthed>
              {() =>
                <Link
                  className="player-tablet__out"
                  to="/"
                  onClick={handleOut}
                >
                  <Button
                    text="Выйти"
                    className="player-tablet__out"
                  />
                </Link>
              }
            </IfFirebaseAuthed>
          }
          <h2 className="player-tablet__hero">{hero}</h2>
          <span className="player-tablet__role">{role}</span>
        </header>
        <img
          src={`assets/tablets/${heroId}.jpeg`}
          alt={heroId}
          className="player-tablet__hero-image"
        />
        {
          isPlayer &&
          <div className="player-tablet__checking">
            <Counter value={0} />
            <Button text="Разведка" isActive={isPlayer} />
            <Button text="Проверка" isActive={isPlayer} />
            <Link to="check" className="player-tablet__check-link">
              <Arrow className="player-tablet__check-icon" />
            </Link>
          </div>
        }
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
          {
            isPlayer &&
            <Counter
              value={inspiration}
              maxValue={maxInspiration}
              onChange={number => handleInspirationChange(number)}
            />
          }
        </div>
        {
          damage.length &&
          <CardGroup
            title={CardName.DAMAGE}
            type={CardType.DAMAGE}
            list={damage}
            modifier='player-tablet__group'
            isActive={isPlayer}
          />
        }
        {
          fear.length > 0  &&
          <CardGroup
            type={CardType.FEAR}
            title={CardName.FEAR}
            list={fear}
            modifier='player-tablet__group'
            isActive={isPlayer}
          />
        }
      </div>
      {
        (prepared || items) &&
        <div className="player-tablet__row player-tablet__row--prepared">
          {
            prepared.length > 0 &&
            <CardGroup
              title={CardName.PREPARED}
              type={CardType.PREPARED}
              list={prepared}
              isOpened={true}
              role={roleId}
              hero={heroId}
              isPrepared={true}
              modifier='player-tablet__group'
              isActive={isPlayer}
            />
          }
          {
            items.length > 0 &&
            <CardGroup 
              title={CardName.ITEM}
              type={CardType.ITEM}
              list={items}
              isOpened={true}
              modifier='player-tablet__group'
              isActive={isPlayer}
            />
          }
        </div>
      }
    </div>
  )
}

export default PlayerTablet;