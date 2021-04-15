import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeTokenAction } from '../../actions/userActions';
import lightbulb from '../../assets/images/lightbulb.png';

const DisplayMobile = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(removeTokenAction());
  };

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
                  onClickEvent={handleLogOut}
                >
                  Log Out
                </button>
              </Link>
              <Link to="/main/mymeme">
                <button className="mobile-button" type="button">
                  My memes
                </button>
              </Link>
              <Link to="/">
                <button className="mobile-button" type="button">
                  Create Meme
                </button>
              </Link>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DisplayMobile;
