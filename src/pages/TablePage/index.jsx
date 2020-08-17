import React, { useContext, useEffect } from 'react';

import 'firebase/firestore';

import PlayerTablet from 'components/PlayerTablet';
import UtilityTablet from 'components/UtilityTablet';
import Loader from 'components/Loader';

import { store } from 'store/store.js';

import useHeroesCollection from 'hooks/useHeroesCollection';
import useHero from 'hooks/useHero';

import './TablePage.scss';

const TablePage = () => {
  const hero = useHero();
  const { heroesList, loading } = useHeroesCollection();
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    dispatch({
      type: 'setFirebaseId', 
      payload: 
        heroesList.length && heroesList.find(item => {
          return(item.heroId === hero);
        }).id
    });
  }, [heroesList, hero, dispatch]);

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