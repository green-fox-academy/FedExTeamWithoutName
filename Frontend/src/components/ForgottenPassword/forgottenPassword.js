import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchService } from '../../services'
import '../../styles/registerForm.css';
import formImage from '../../assets/images/formImage.jpg'


const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
 

  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault();
    try {
      const responseBody = await fetchService.fetchData('forgottenpass', 'POST', { email }, null);
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
        <h2 className="forgottenTitle">Please enter your e-mail address</h2>
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
          {error && (<div>{error}</div>)}
          <button type="submit">SUBMIT</button>
        </form>
        <img className="registerFormImg" src={formImage} alt="Register Form" height="400px"></img>
    </div>
  );
};

export default ForgottenPassword;
