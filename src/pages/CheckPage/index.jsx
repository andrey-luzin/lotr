import React from 'react';
import { Link } from 'react-router-dom';

import Checking from 'components/Checking';

import { ReactComponent as Arrow } from 'assets/imgs/arrow.svg';

import './CheckPage.scss';

const Bilbo = {
  roleId: 'burglar',
  heroId: 'bilbo',
  hero: "Бильбо",
  role: "Взломщик",
  deck: [
    {
      id: 1,
      type: 'base'
    },
    {
      id: 2,
      type: 'hero'
    },
    {
      id: 3,
      type: 'role'
    }
  ],
  state: 'intelligence'
};

const Legolas = {
  roleId: 'hunter',
  heroId: 'legolas',
  hero: "Леголас",
  role: "Охотник",
  deck: [
    {
      id: 1,
      type: 'base'
    },
    {
      id: 2,
      type: 'base'
    },
  ],
  state: 'checking'
}

const CheckPage = () => {
  return (
    <div className="check-page">
      <div className="check-page__list">
        <Checking  {...Bilbo } />
        <Checking  {...Legolas } />
      </div>
      <Link to="table" className="check-page__back-link">
        <Arrow className="check-page__back-icon" />
      </Link>
    </div>
  )
};

export default CheckPage;