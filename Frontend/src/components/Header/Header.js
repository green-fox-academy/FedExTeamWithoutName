import React from 'react';
import HeaderWhenNotLoggedIn from './HeaderWhenNotLoggedIn';
import HeaderWhenLoggedIn from './HeaderWhenLoggedIn';
import '../../styles/header.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const { accessToken } = useSelector(state => state.userData);

  return accessToken ? <div className="header"><HeaderWhenLoggedIn /></div> : <div className="header"><HeaderWhenNotLoggedIn /></div>;
};

export default Header;
