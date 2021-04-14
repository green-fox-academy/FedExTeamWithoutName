import React, { useState, useEffect } from 'react';
import DisplayMobileLoggedOut from './DisplayMobileLoggedOut';
import DisplayDesktopLoggedOut from './DisplayDesktopLoggedOut';

const HeaderWhenNotLoggedIn = () => {
  
  const [state, setState] = useState({
    mobileView: false,
  });
  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return mobileView ? <DisplayMobileLoggedOut /> : <DisplayDesktopLoggedOut />;
};

export default HeaderWhenNotLoggedIn;