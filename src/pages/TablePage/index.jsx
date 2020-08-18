import React, { useContext, useEffect } from 'react';

import 'firebase/firestore';

import PlayerTablet from 'components/PlayerTablet';
import UtilityTablet from 'components/UtilityTablet';
import Loader from 'components/Loader';

import { store } from 'store/store.js';

import useHeroesCollection from 'hooks/useHeroesCollection';
import useHeroName from 'hooks/useHeroName';

import { SET_FIREBASE_ID } from 'constants/Actions';

import './TablePage.scss';

const TablePage = () => {
  const activeHeroName = useHeroName();
  const { heroesList, loading } = useHeroesCollection();
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    !loading && activeHeroName &&
    dispatch({
      type: SET_FIREBASE_ID,
      payload: 
         heroesList.find(item => {
          return(item.heroId === activeHeroName);
        }).id
    });
  }, [heroesList, activeHeroName, dispatch, loading]);

  return (
    <div className="table-page">
      {
        loading ?
        <Loader/> :
        <>
          <div className="table-page__players-list">
            {
              heroesList.map((hero, index) => <PlayerTablet {...hero} key={index} />)
            }
          </div>
          <UtilityTablet className="table-page__utils" />
        </>
      }
    </div>
  )
}

export default TablePage;