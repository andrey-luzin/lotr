import React from 'react';

import PlayerTablet from 'components/PlayerTablet';
import UtilityTablet from 'components/UtilityTablet';

import './TablePage.scss';

const Bilbo = {
  roleId: 'burglar',
  heroId: 'bilbo',
  hero: "Бильбо",
  role: "Взломщик",
  inspiration: 6,
  maxInspiration: 6,
  damage: [
   {
     type: 'opened',
     cards: [1]
   },
   {
     type: 'closed',
     cards: [2, 3]
   }
  ],
  fear: [1],
  prepared: [
    {
      type: 'base',
      cards: [1,2]
    },
    {
      type: 'hero',
      cards: [2,3]
    },
    {
      type: 'role',
      cards: [1,2,3]
    }
  ],
  items: [
    {id: 1},
    {id: 3, tokens: 2}
  ]
};

const Legolas = {
  roleId: 'hunter',
  heroId: 'legolas',
  hero: "Леголас",
  role: "Охотник",
  inspiration: 2,
  maxInspiration: 6,
  damage: [1],
  fear: [1],
  prepared: [
    {
      type: 'role',
      cards: [1]
    },
  ],
  items: [{id: 1}]
};

const TablePage = () => {
  return (
    <div className="table-page">
      <div className="table-page__players-list">
        <PlayerTablet {...Bilbo} />
        <PlayerTablet {...Legolas} />
      </div>
      <UtilityTablet className="table-page__utils" />
    </div>
  )
}

export default TablePage;