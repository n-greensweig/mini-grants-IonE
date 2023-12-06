import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

import UserMenu from './UserMenu';
import NavMenu from './navMenu';


function Nav() {
  


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Mini Grants</h2>
      </Link>
      <div className="menuContainer">
      <div className='navMenu'>
      <NavMenu />
      </div>
    <div className="userMenu">
    <UserMenu />
    </div>
    </div>
    
    
    {/* <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Mini Grants</h2>
      </Link>
    
        <Link className="navLink" to="/adminhomeview">
          Admin-Home
        </Link>

        <Link className="navLink" to="/adminallgrantsdata">
          Admin-AllGrantsData
        </Link>

        <Link className="navLink" to="/grantreviewform">
          Grant-ReviewForm
        </Link>

        <Link className="navLink" to="/reviewerform">
          Reviewer-Form
        </Link>

        <Link className="navLink" to="/reviewerhomepage">
          Reviewer/Home
        </Link>

        <Link className="navLink" to="/scoredreviews">
          Scored Reviews
        </Link>

      </div> */}
</div>
  );
}

export default Nav;
