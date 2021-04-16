import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeTokenAction } from '../../actions/userActions';
import HeaderButton from './HeaderButton';
import lightbulb from '../../assets/images/lightbulb.png';

const DisplayDesktop = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(removeTokenAction());
  };

  return (
    <div className="flex flex-jc-flex-end">
      <Link to="/">
        <div className="logoHolder">
          <img className="lightbulb" src={lightbulb} alt="lightbulb"></img>
        </div>
      </Link>
      <div id="header-logged-in-button-box">
        <HeaderButton path="/main/newgenerator" innerText="Create MEME" />
        <HeaderButton path="/main/mymeme" innerText="My memes" />
        <HeaderButton
          path="/"
          innerText="Log out"
          onClickEvent={handleLogOut}
        />
      </div>
    </div>
  );
};

export default DisplayDesktop;
