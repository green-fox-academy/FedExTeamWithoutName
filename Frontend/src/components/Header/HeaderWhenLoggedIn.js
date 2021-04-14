import React, { useState, useEffect } from 'react';
import DisplayMobile from './DisplayMobile';
import DisplayDesktop from './DisplayDesktop';
const HeaderWhenLoggedIn = () => {
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

  return mobileView ? <DisplayMobile /> : <DisplayDesktop />;
};

export default HeaderWhenLoggedIn;