// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa';
import './UserHeader.css';

function  UserHeader({ userName, onLogout }) {
  return (
    <div className="header-container">
      <div className="header-left">
        <h1>UMS</h1>
      </div>
      <div className="header-right">
       
        <Link to="/dashboard">
        <FaUserCircle />
          <span>Name</span>
        </Link>
        <button onClick={onLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserHeader;
