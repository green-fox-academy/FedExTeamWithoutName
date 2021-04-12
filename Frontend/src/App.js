import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import RootRedirect from './components/RootRedirect/RootRedirect';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={RootRedirect} />
        <Switch>
          <Route exact path="/main" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;