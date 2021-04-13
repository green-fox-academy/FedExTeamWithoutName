import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import setShowMemeDetailsAction from '../../actions/memeDetailsAction';
import MemeDetails from '../MemeDetails/MemeDetails';

const Main = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowMemeDetailsAction(true));
  };

  return (
    <div id="main">
      <Switch>
        <Route exact path="/main">
          <h1>HELLO</h1>
          <button onClick={handleClick}>EZ ITT EGY MEME</button>
          <MemeDetails />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
