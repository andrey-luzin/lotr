import React from 'react';

import 'firebase/firestore';

import PlayerTablet from 'components/PlayerTablet';
import UtilityTablet from 'components/UtilityTablet';
import Loader from 'components/Loader';

import useHeroes from 'hooks/useHeroes';

import './TablePage.scss';

const TablePage = () => {
  const heroesList = useHeroes();

  return (
    <div className="table-page">
      <div className="table-page__players-list">
        {
          heroesList.loading && <Loader/>
        }
        {
          heroesList.array.map((hero, index) => <PlayerTablet {...hero} key={index} />)
        }
      </div>
      <UtilityTablet className="table-page__utils" />
    </div>
  )
}

export default TablePage;