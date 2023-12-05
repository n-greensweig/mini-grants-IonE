import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

import './LandingPage.css';

//Material UI Icon
import GoogleIcon from '@mui/icons-material/Google';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = (event) => {

    const serverURL = 'http://localhost:5001'; // Replace with your server URL
    const route = 'google';
    const fullURL = `${serverURL}/${route}`;
    window.location.href = fullURL;

    }
  
    useEffect(() => {
      axios.get('/userInfoRoute')
      .then((response) => {
        console.log('User info Route Response', response.data)
        dispatch({ type: 'SET_USER', payload: response.data })
      }).catch((error) => {
        console.error(error);
      })
    }, [dispatch]);

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_4">

          <center>
            <Button className="btn btn_sizeSm" variant={"contained"} onClick={onLogin}>
              <GoogleIcon />  Login Using Google
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
