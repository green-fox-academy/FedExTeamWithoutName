import { Link } from 'react-router-dom';
import HeaderButton from './HeaderButton';
import lightbulb from '../../assets/images/lightbulb.png';

const DisplayDesktop = () => {
  const handleLogOut = () => {
    console.log('remove token');
  };

  return (
    <div className="flex flex-jc-flex-end">
      <Link to="/">
        <div className="logoHolder">
          <img className="lightbulb" src={lightbulb} alt="lightbulb"></img>
        </div>
      </Link>
      <div id="header-logged-in-button-box">
        <HeaderButton path="/create" innerText="Create MEME" />
        <HeaderButton path="/mymemes" innerText="My memes" />
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