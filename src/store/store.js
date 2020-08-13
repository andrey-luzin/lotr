import React, {createContext, useReducer} from 'react';
import context from 'constants/Context';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'setPlayer':
        if (action.payload !== localStorage.getItem(context.hero)) {
          localStorage.setItem(context.hero, action.payload);
        }
        return {...state, hero: action.payload};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }