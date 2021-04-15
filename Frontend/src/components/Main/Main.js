import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MemeFeed from '../MemeFeed/MemeFeed';
import MyMeme from '../MyMeme/MyMeme';
import '../../styles/main.css';

const Main = () => {

  return (
    <div id="main">
      <Switch>
        <Redirect exact from="/main" to="/main/memefeed" />
        <Route path="/main/memefeed" component={MemeFeed} />
        <Route path="/main/mymeme" component={MyMeme} />
      </Switch>
    </div>
  );
};

export default Main;
