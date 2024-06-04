import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'


function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const res = await axiosInstance.post("/token/", {
                "username":email,  
                password
            });
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")   

    }} catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
    }
    
    
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Email</p> <br />
        <input type="email" onChange={(e)=>setEmail(e.target.value) } /> <br />
        <p>Password</p> <br />
        <input type="password" onChange={(e)=>setPassword(e.target.value) } /> <br />
        <button type='submit'>Login</button>
        </form>


    </div>
  )
}

export default LoginForm