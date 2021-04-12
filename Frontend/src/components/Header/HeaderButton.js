import React from 'react';
import { Link } from 'react-router-dom';

const HeaderButton = ({ path, innerText, onClickEvent}) => {
  
  return(
    <Link to={path}>
      <button className="header-button" type="button" onClick={onClickEvent}>
        {innerText}
      </button>
    </Link>
  )
};

export default HeaderButton;