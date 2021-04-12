import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div>
        <h2>Sorry</h2>
        <p>Not implemented yet</p>
        <button type="button" onClick={handleClick}>Go Home!</button>
    </div>
  );
};

export default NotFound;
