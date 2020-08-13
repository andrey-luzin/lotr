import React from 'react';

import 'firebase/firestore';

import PlayerTablet from 'components/PlayerTablet';
import UtilityTablet from 'components/UtilityTablet';
import Loader from 'components/Loader';

import useCollection from 'hooks/useHeroes';

import './TablePage.scss';

const TablePage = () => {
  const { heroesList, loading } = useCollection();

  return (
    <div className="table-page">
      <div className="table-page__players-list">
        {
          loading && <Loader/>
        }
        {
          heroesList.map((hero, index) => <PlayerTablet {...hero} key={index} />)
        }
      </div>
      <UtilityTablet className="table-page__utils" />
    </div>
  )
}

export default TablePage;