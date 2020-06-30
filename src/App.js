import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import TablePage from './pages/TablePage';

import './assets/styles/_general.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/table" component={TablePage} />
      </Switch>
    </Router>
  );
}

export default App;
