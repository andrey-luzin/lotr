import React, {createContext, useReducer} from 'react';
import context from 'constants/Context';

import { SET_FIREBASE_ID, SET_PLAYER } from 'constants/Actions';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case SET_PLAYER:
        if (action.payload !== localStorage.getItem(context.heroId)) {
          localStorage.setItem(context.heroId, action.payload);
        }
        return {...state, heroId: action.payload};
      case SET_FIREBASE_ID:
        return {...state, firebaseId: action.payload};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }