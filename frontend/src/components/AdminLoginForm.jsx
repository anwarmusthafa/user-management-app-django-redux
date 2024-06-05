import React, { useState } from 'react';
import { ADMIN_ACCESS_TOKEN, ADMIN_REFRESH_TOKEN } from '../constants';
import { adminAxiosInstance } from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import "./AdminLoginForm.css"

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminAxiosInstance.post('/admin/login/', {
                username,
                password,
            });
            localStorage.setItem(ADMIN_ACCESS_TOKEN, response.data.access);
            localStorage.setItem(ADMIN_REFRESH_TOKEN, response.data.refresh);
            setLoading(false);
            console.log(response);
            if (response.status === 200) {
                navigate('/admin/home/');
            }
            
            // Redirect or perform other actions on successful login
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
