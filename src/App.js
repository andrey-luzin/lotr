import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from 'firebaseConfig';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

import { StateProvider, store } from 'store/store.js';
import StartPage from 'pages/StartPage';
import TablePage from 'pages/TablePage';
import CheckPage from 'pages/CheckPage';
import context from 'constants/Context';

import './assets/styles/_general.scss';

const App = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const localPlayer  = localStorage.getItem(context.hero);

  firebase.initializeApp(firebaseConfig);

  // useEffect(() => {
  //   if (localPlayer) {
  //     dispatch({ type: 'setPlayer', payload: localPlayer });
  //   }
  // });

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <StateProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Route path="/table" component={TablePage} />
            <Route path="/check" component={CheckPage} />
          </Switch>
          {/* <IfFirebaseUnAuthed>
            {() => <Redirect to="/"/>}
          </IfFirebaseUnAuthed> */}
        </Router>
      </StateProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
