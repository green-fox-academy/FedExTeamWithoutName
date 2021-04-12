import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchService } from '../../services';
import formImage from '../../assets/images/formImage.png'
import '../../styles/loginForm.css';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();


  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      const responseBody = await fetchService.fetchData('login', 'POST', { userName, password }, null);
      console.log(responseBody);
      history.push('/main');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="loginBox">
     <img className="loginFormImage" src={formImage} alt="Login Form" height="400px"></img>
      <form className="loginForm" onSubmit={handleSubmit}>
         <h1 className="loginTitle">Login</h1>
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
          <button type="submit">LOG IN</button>
        </form>
    </div>
  );
};

export default Login;
