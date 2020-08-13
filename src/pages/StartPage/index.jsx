import React, { useContext, useEffect, useState } from 'react';
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

import useCollection from 'hooks/useHeroes';

import './StartPage.scss';

const StartPage = () => {
  const { heroesList, loading } = useCollection();
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const localPlayer  = localStorage.getItem(context.hero);
  const [heroId, setheroId] = useState("");

  const handleOnChange = (newValue = '') => {
    setheroId(newValue);
  };

  const handleAuth = () => {
    firebase.auth().signInAnonymously().then(() =>{
      dispatch({ type: 'setPlayer', payload: heroId });
    });
  };

  useEffect(() => {
    if (localPlayer) {
      setheroId(localPlayer);
    } else {
      setheroId('')
    }
  }, [localPlayer]);

  if (!heroesList) {
    return null;
  }

  return (
      <div className="start-page">
        {
          loading ? <Loader/> :
          <>
            <Select
              value={heroId}
              onChange={handleOnChange}
              heroesList={
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
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return (
                  <>
                    <pre style={{ whiteSpace: "normal", wordBreak: "break-all"}}>
                      {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                    </pre>
                  </>
                );
              }}
            </FirebaseAuthConsumer>
          </>
        }
      </div>
  )
}

export default StartPage;