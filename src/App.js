import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import TablePage from './pages/TablePage';
import CheckPage from './pages/CheckPage';

import './assets/styles/_general.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/table" component={TablePage} />
        <Route path="/check" component={CheckPage} />
      </Switch>
    </Router>
  );
}

export default App;
