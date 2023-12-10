import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

import UserMenu from './UserMenu';
import NavMenu from './navMenu';
import { useSelector } from 'react-redux';


function Nav() {
  
const user = useSelector(store => store.user.userReducer);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Mini Grants</h2>
      </Link>
      
      <div className="menuContainer">
      <div className='navMenu'>
        {user.id &&
      <NavMenu />
        }
      </div>
    <div className="userMenu">
    <UserMenu />
    </div>
    </div>
</div>
  );
}

export default Nav;
