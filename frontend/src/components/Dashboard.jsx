import React, { useState } from 'react';
import './Dashboard.css'; 
import { useDispatch} from 'react-redux';
import { userAxiosInstance } from '../axiosInstance';
import { userLogin } from './../redux/userSlice';

const Dashboard = () => {
    const userString = localStorage.getItem('user');
    const this_user = userString ? JSON.parse(userString) : null;
    const [user, setUser] = useState(this_user);
    const dispatch = useDispatch();
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profileImage: reader.result });
      

    };
    if (file) {
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('profile_image', file);
      const userId = user.id;
      userAxiosInstance.patch(`update_profile_image/${userId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        // Assuming the response just contains the updated user data
        setUser(res.data);
        console.log("Image uploaded successfully", res.data);
        dispatch(userLogin(res.data));
      }).catch((err) => {
        console.log("Error uploading image", err);
      });
    }
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="profile-info">
        <img src={user ? user.profile_image : null} alt="Profile" className="profile-image" />
        <div className="info">
          <p><strong>Name:</strong> {user? user.name:null}</p>
          <p><strong>Phone Number:</strong> {user? user.phone:null}</p>
          <p><strong>Address:</strong> {user? user.address:null}</p>
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
