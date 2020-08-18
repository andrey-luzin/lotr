import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthConsumer
} from "@react-firebase/auth";

import Loader from 'components/Loader';

import { store } from 'store/store.js';
import Select from 'components/Select';
import context from 'constants/Context';

import useHeroesCollection from 'hooks/useHeroesCollection';
import useHeroName from 'hooks/useHeroName';

import { SET_PLAYER } from 'constants/Actions';

import './StartPage.scss';
import { useEffect } from 'react';

const StartPage = () => {
  const activeHeroName = useHeroName();
  const { heroesList, loading } = useHeroesCollection();
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [heroId, setheroId] = useState('');

  useEffect(() => {
    setheroId(activeHeroName);
  }, [activeHeroName]);

  const handleOnChange = (newValue = '') => {
    setheroId(newValue);
  };

  const handleAuth = () => {
    firebase.auth().signInAnonymously().then(() =>{
      dispatch({ type: SET_PLAYER, payload: heroId });
    });
  };

  return (
      <div className="start-page">
        {
          loading ? <Loader/> :
          <>
            <Select
              value={heroId}
              onChange={handleOnChange}
              list={
                heroesList.map(hero => {
                  return({
                    heroId: hero.heroId,
                    hero: hero.hero
                  })
                })
              }
            />
            <Link
              to={heroId && 'table'}
              className={`start-page__go ${!heroId ? 'start-page__go--isDisable' : ''}`}
              onClick={handleAuth}
            >
              Начать
            </Link>
          </>
        }
      </div>
  )
}

export default StartPage;