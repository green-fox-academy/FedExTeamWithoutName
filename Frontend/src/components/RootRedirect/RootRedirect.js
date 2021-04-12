import React from 'react';
import { Redirect } from 'react-router-dom';

const RootRedirect = () => {
  const accessToken = true;
  return accessToken ? <Redirect to="/main" /> : <Redirect to="/login" />;
};

export default RootRedirect;
