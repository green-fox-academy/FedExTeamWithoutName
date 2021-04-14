import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MemeFeed from '../MemeFeed/MemeFeed';
import '../../styles/main.css';

const Main = () => {

  return (
    <div id="main">
      <h1>HELLO</h1>
      <Switch>
        <Redirect exact from="/main" to="/main/memefeed" />
        <Route path="/main/memefeed" component={MemeFeed} />
      </Switch>
    </div>
  );
};

export default Main;
