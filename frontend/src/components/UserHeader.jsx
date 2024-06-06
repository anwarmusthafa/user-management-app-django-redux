// Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt} from 'react-icons/fa';
import './UserHeader.css';
import {  useDispatch} from 'react-redux';
import { userLogout } from '../redux/userSlice';


function  UserHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const Logout = () => {
    localStorage.clear();
    dispatch(userLogout())
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
          <span>{user?user.name:null}</span>
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
