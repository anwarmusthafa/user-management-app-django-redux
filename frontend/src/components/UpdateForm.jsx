import React, { useEffect, useState } from 'react';
import './UpdateForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAxiosInstance } from '../axiosInstance';
import { useDispatch } from 'react-redux';

const UpdateForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await adminAxiosInstance.get(`update_user/${id}/`);
                const userData = response.data;
                setName(userData.name);
                setPhone(userData.phone);
                setAddress(userData.address);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, phone, address };
        try {
            const res = await adminAxiosInstance.patch(`update_user/${id}/`, data);
            console.log(res.data);
            navigate("/admin/home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="update-form-container">
            <form className="update-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input value={name} type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input value={phone} type="text" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input value={address} type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit" className="btn-update">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
