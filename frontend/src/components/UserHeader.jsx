// Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa';
import './UserHeader.css';

function  UserHeader({ userName}) {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className="header-container">
      <div className="header-left">
      <h1><Link to="/" className="custom-link">UMS</Link></h1>
      </div>
      <div className="header-right">
       
        <Link to="/dashboard">
        <FaUserCircle />
          <span>Name</span>
        </Link>
        <button onClick={Logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserHeader;
