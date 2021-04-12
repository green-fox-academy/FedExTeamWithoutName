import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Main = () => {

  return (
    <div id="main">
      <Switch>
        <Route exact path="/main">
          <h1>HELLO</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
