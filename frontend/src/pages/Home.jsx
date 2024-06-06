import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import './Home.css'; // Import the CSS file
import { userAxiosInstance } from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { userLogin } from './../redux/userSlice';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userAxiosInstance.get('get_user/');
        console.log("user", res.data);
        dispatch(userLogin(res.data));
        setIsLoading(false); // Data has been fetched, set loading to false
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  console.log("user local", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserHeader />
      <div className="home-container">
        <h2>Welcome {user ? user.name : null}</h2> <br /> <br />
        <img src={user ? user.profile_image : null} alt="Profile" className="profile-image" />
      </div>
    </div>
  );
}

export default Home;
