import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const history = useHistory();

  const handleGoogle = () => {
    axios.get('/auth/google').then((response) => {
      console.log(response); //This code doesn't run, goes to error
    }).catch((error) => {
      console.log(error);
    })
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
    </div>
  );
}

export default LoginPage;
