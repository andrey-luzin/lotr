import React from 'react';
import { Link } from 'react-router-dom';

import './StartPage.scss';

const StartPage = () => {
  return (
    <div className="start-page">
      <Link to="table" className="start-page__go">Начать</Link>
    </div>
  )
}

export default StartPage;