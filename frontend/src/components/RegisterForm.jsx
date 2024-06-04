import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import './RegisterForm.css';

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('address', address);
            if (profileImage) {
                formData.append('profile_image', profileImage);
            }

            const res = await axiosInstance.post("/user/register/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='register-form'>
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label> 
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        {loading ? "Loading..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
