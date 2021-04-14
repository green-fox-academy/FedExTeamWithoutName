import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import RootRedirect from './components/RootRedirect/RootRedirect';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';
import ForgottenPassword from './components/ForgottenPassword/forgottenPassword';
import Upload from './components/Upload/Upload';
import MemeDetails from './components/MemeDetails/MemeDetails';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={RootRedirect} />
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgotten" component={ForgottenPassword} />
          <Route path="/upload" component={Upload} />
          <Route path="*" component={NotFound} />
        </Switch>
        <MemeDetails />
      </div>
    </Router>
  );
};

export default App;