import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchService } from '../../services';
import { Link } from 'react-router-dom';
import { storeUserDataAction } from '../../actions/userActions';
import formImage from '../../assets/images/formImage.jpg'
import '../../styles/loginForm.css';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      const responseBody = await fetchService.fetchData('login', 'POST', { userName, password }, null);
      // !!!!! ezt kell tovább adni az action-nek: { accessToken: accessToken, id: id, userName: userName } !!!!!
      dispatch(storeUserDataAction({ ...responseBody, userName }));
      console.log(responseBody);
      history.push('/main');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="loginBox">
     <img className="loginFormImg" src={formImage} alt="Login Form" height="400px"></img>
      <form className="loginForm" onSubmit={handleSubmit}>
         <h1 className="loginTitle">SIGN IN</h1>
         <div className="iconHolder">
          <i className="fa fa-user icon">
              </i>
          <input
            className="logininput"
            type="text"
            placeholder="Username"
            minLength="3"
            value={userName}
            onChange={changeEvent => {
              setUserName(changeEvent.target.value);
              setError(null);
            }}
          />
          </div>
          <div className="iconHolder">
          <i className="fa fa-key icon">
              </i>
          <input
            className="logininput"
            type="password"
            placeholder="Password"
            minLength="6"
            value={password}
            onChange={changeEvent => {
              setPassword(changeEvent.target.value);
              setError(null);
            }}
          />
          </div>
          {error && (<div>{error}</div>)}
          <button type="submit">SIGN IN</button>   
        </form>
        <Link to="/forgotten"><p className="forgottenPassword">Forgot your password?</p></Link>
    </div>
  );
};

export default Login;
