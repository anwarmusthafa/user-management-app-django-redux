import React, { useState } from 'react';
import './Dashboard.css';  // Make sure to import the CSS file

const Dashboard = () => {
  const [user, setUser] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profileImage: 'https://via.placeholder.com/150'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profileImage: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="profile-info">
        <img src={user.profileImage} alt="Profile" className="profile-image" />
        <div className="info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <div className="change-image">
          <input type="file" id="file-input" onChange={handleImageChange} />
          <label htmlFor="file-input" className="change-image-button">Change Profile Image</label>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
