import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import './LandingPage.css';
import { Grid, Typography, Paper, Box } from '@mui/material';



function LandingPage() {
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
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} sx={{ margin: '5px'}}>
    
        <Grid item md={6}>
          <Paper sx={{ padding: '15px', margin: '5px'}}>
            <center>
      <Typography variant='h4'>University of Minnesota</Typography>
      <Typography variant='h5'>Institute on the Enviornment</Typography>
      <Typography variant='h6'>Mini Grant Program</Typography>
      <br />
      </center>
          <Typography variant='body'>Institute on the Environment Mini Grants are designed to support and spark collaborative
            projects addressing environmental and sustainability issues across the University of Minnesota five-campus system. 
            These grants of up to $3,000 may be used for a range of research, leadership, education, storytelling, and outreach activities.
            Proposals that advance new collaborations – across disciplines and ways of knowing, among partners and people – are highly encouraged.
            This program is offered annually in March and September. For more detailed information, 
            please review the <a href="http://environment.umn.edu/fellows-grants/grants/">Request For Proposal (RFP).</a></Typography>
            </Paper>
          </Grid>
          
          <Grid item md={4}>
             {!user.id &&
            <Paper sx={{ padding: '5px', margin: '5px'}}>
              <Typography variant='body'>If you have been selected as a mini grant reviewer 
              please begin by logging in with your Google account</Typography>
              <center>
              <Paper sx={{ padding: '5px', marginTop: '5px', boxShadow: 'none'}}>
            <GoogleLogin />
            </Paper>
            </center>
            </Paper>
          }
            <Grid item md={12}>
            <Paper sx={{ padding: '15px', margin: '5px', marginTop: '20px'}}>
              <center>
              <Typography variant='h6'>
                Application designed and created by Prime Digital Academy Tourmaline Cohort
                </Typography>
                <br />
                <Typography variant='body'>
                Jeffrey Varughese, Haleigh Ziebol, Jeff Walter, Jenny Van Gilder, Rafael Yasis and Riley Alexis
                </Typography>
            </center>
              
            </Paper>
          </Grid>
          </Grid>

    </Grid>
    </Box>
  );
}

export default LandingPage;
