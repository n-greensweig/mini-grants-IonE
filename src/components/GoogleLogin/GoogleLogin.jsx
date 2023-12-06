import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//Material UI
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';


function GoogleLogin () {

    const dispatch = useDispatch();



    const onLogin = () => {

        const route = 'google';
        const fullURL = `${process.env.REACT_APP_serverURL}/${route}`;
        window.location.href = fullURL;
    
        }

    return (
        <Button className="btn btn_sizeSm" variant={"contained"} onClick={onLogin}>
        <GoogleIcon />  Login Using Google
      </Button>
    )
}

export default GoogleLogin;