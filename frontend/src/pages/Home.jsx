// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <UserHeader />

      <div className="home-container">
        <h2>Welcome User</h2> <br /> <br />
        <img src="" alt="Profile" className="profile-image" />
      </div>
    </div>
  );
}

export default Home;
