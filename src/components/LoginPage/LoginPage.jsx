import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const history = useHistory();

  const handleGoogle = () => {
    axios.get('/api/oauth/login');
  }



  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
      <button type="button" className='google-btn' onClick={handleGoogle}>Log In Using Google Account</button>
    </div>
  );
}

export default LoginPage;
