import React, { useState } from 'react';
import { userAxiosInstance } from '../axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = ({ admin = false }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        address: "",
        profileImage: null
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            profileImage: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, name, phone, address, profileImage } = formData;

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

            const res = await userAxiosInstance.post("/user/register/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                if (admin) {
                    navigate("/admin/home");
                } else {
                    navigate("/login");
                }
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        {loading ? "Loading..." : "Register"}
                    </button>
                </div>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
