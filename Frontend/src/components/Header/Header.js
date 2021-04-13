import React from 'react';
import HeaderWhenNotLoggedIn from './HeaderWhenNotLoggedIn';
import HeaderWhenLoggedIn from './HeaderWhenLoggedIn';
import '../../styles/header.css';

const Header = () => {
  const accessToken = false;

  return accessToken ? <div className="header"><HeaderWhenLoggedIn /></div> : <div className="header"><HeaderWhenNotLoggedIn /></div>;
};

export default Header;
