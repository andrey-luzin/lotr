import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthConsumer
} from "@react-firebase/auth";

import { store } from 'store/store.js';
import Select from 'components/Select';

import './StartPage.scss';

const StartPage = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [heroId, setheroId] = React.useState("");


  const handleOnChange = (newValue = '') => {
    setheroId(newValue);
  };

  const handleAuth = () => {
    firebase.auth().signInAnonymously();
    dispatch({ type: 'setPlayer', payload: heroId })
  };

  return (
      <div className="start-page">
        {/* <Provider value={{hero: heroId}}> */}
          <Select value={heroId} onChange={handleOnChange} />
          <Link
            to={heroId && 'table'}
            className={`start-page__go ${!heroId ? 'start-page__go--isDisable' : ''}`}
            onClick={handleAuth}
          >
            Начать
          </Link>
        {/* </Provider> */}

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
      </div>
  )
}

export default StartPage;