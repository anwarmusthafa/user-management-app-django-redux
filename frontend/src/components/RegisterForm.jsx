import React, { useState } from 'react'
import axiosInstance from '../axiosIinstance'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import './RegisterForm.css';



function RegisterForm() {
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("password doesn't match");
            return;
        }
        try{
            setLoading(true);
            const res = await axiosInstance.post("/user/register/", {
                "username":email,  
                password
            });

            if(res.status === 201){
                navigate("/login")
            }

    } catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
    }
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
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    {loading ? "Loading..." : "Register"}
                </button>
            </div>

        </form>
      
    </div>
  )
}

export default RegisterForm
