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
    {id: 1, type: 'opened'},
    {id: 3, type: 'closed'},
    {id: 4, type: 'closed'},
    {id: 5, type: 'closed'}
  ],
  fear: [
    {id: 3, type: 'closed'}
  ],
  prepared: [
    {id: 1, type: 'base'},
    {id: 2, type: 'base'},
    {id: 2, type: 'hero'},
    {id: 3, type: 'hero'},
    {id: 4, type: 'role'},
    {id: 5, type: 'role'},
    {id: 5, type: 'role'}
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
  damage: [
    {id: 1, type: 'opened'}
  ],
  fear: [
    {id: 2, type: 'closed'}
  ],
  prepared: [
    {id: 1, type: 'base'}
  ],
  items: [
    {id: 1}
  ]
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