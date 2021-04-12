import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchService } from '../../services'
import '../../styles/registerForm.css';
import formImage from '../../assets/images/formImage.png'


const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
 

  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      const responseBody = await fetchService.fetchData('register', 'POST', { userName, password }, null);
      console.log(responseBody);
      history.push('/login');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="registerBox">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1 className="registerTitle">Register</h1>
        <div className="iconHolder">
          <i className="fa fa-envelope icon">
              </i>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeEvent => {
              setEmail(changeEvent.target.value);
              setError(null);
            }}
          />
          </div>
          <div className="iconHolder">
          <i className="fa fa-user icon">
              </i>
          <input
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
            type="password"
            placeholder="Password"
            minLength="6"
            value={password}
            onChange={changeEvent => {
              setPassword(changeEvent.target.value);
              setError(null);
            }}
          /></div>
          {error && (<div>{error}</div>)}
          <button type="submit">SIGN UP</button>
        </form>
        <img className="loginFormImage" src={formImage} alt="Login Form" height="400px"></img>
    </div>
  );
};

export default Register;
