import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MemeFeed from '../MemeFeed/MemeFeed';
import MyMeme from '../MyMeme/MyMeme';
import MemeGenerator from '../NewGenerator/MemeGenerator'
import '../../styles/main.css';

const Main = () => {

  return (
    <div id="main">
      <Switch>
        <Redirect exact from="/main" to="/main/memefeed" />
        <Route path="/main/memefeed" component={MemeFeed} />
        <Route path="/main/mymeme" component={MyMeme} />
        <Route path="/main/newgenerator" component={MemeGenerator} />
      </Switch>
    </div>
  );
};

export default Main;
