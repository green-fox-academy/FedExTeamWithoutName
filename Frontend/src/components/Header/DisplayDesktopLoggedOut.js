import { Link } from 'react-router-dom';
import HeaderButton from './HeaderButton';
import lightbulb from '../../assets/images/lightbulb.png';

const DisplayDesktopLoggedOut = () => {

  return (
    <div className="flex flex-jc-flex-end">
      <Link to="/">
        <div className="logoHolder">
          <img className="lightbulb" src={lightbulb} alt="lightbulb"></img>
        </div>
      </Link>
      <div id="header-logged-in-button-box">
        <HeaderButton path="/login" innerText="Log in" />
        <HeaderButton path="/register" innerText="Sign up" />
      </div>
    </div>
  );
};

export default DisplayDesktopLoggedOut;
