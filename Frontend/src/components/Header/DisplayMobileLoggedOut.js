import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { Link } from 'react-router-dom';
import lightbulb from '../../assets/images/lightbulb.png';

const DisplayMobileLoggedOut = () => {
 
  return (
    <div className="flex flex-jc-flex-end">
      <Link to="/">
        <div className="logoHolderMobile">
          <img className="lightbulb" src={lightbulb} alt="lightbulb"></img>
        </div>
      </Link>
      <Dropdown>
        <Dropdown.Toggle variant="success" className="main-button">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <div className="mobileButtonBox">
              <Link to="/logout">
                <button
                  className="mobile-button"
                  type="button"
                >
                  SIGN IN
                </button>
              </Link>
              <Link to="/mymemes">
                <button className="mobile-button" type="button">
                  SIGN OUT
                </button>
              </Link>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DisplayMobileLoggedOut;