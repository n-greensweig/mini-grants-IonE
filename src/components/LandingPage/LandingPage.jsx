import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import './LandingPage.css';


function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const user = useSelector(store => store.user.userReducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get('/userInfoRoute')
  //   .then((response) => {
  //     dispatch({ type: 'SET_USER', payload: response.data })
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }, [dispatch]);

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_4">

          <center>
            {!user.id &&
            <GoogleLogin />
            }
          </center> 
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
