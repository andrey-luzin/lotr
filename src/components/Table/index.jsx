import React from 'react';

// Componenets
import PlayerTablet from '../PlayerTablet';
import UtilityTablet from '../UtilityTablet';

import './Table.scss';

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
     cards: [2]
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
  items: [1,2,3]
}

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
  items: [1]
}

const Table = () => {
  return (
    <div className="table">
      <div className="table__players-list">
        <PlayerTablet {...Bilbo} />
        <PlayerTablet {...Legolas} />
      </div>
      <UtilityTablet className="table__utils" />
    </div>
  )
}

export default Table;