import React, {createContext, useReducer} from 'react';
import context from 'constants/Context';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'setPlayer':
        if (action.payload !== localStorage.getItem(context.heroId)) {
          localStorage.setItem(context.heroId, action.payload);
        }
        return {...state, heroId: action.payload};
      case 'setFirebaseId':
        return {...state, firebaseId: action.payload};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }