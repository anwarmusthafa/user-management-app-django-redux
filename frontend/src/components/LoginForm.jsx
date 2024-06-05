import React, { useState } from 'react'
import {userAxiosInstance} from '../axiosInstance'
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '../constants'
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
            const res = await userAxiosInstance.post("/token/", {
                "username":email,  
                password
            });
            console.log(res);
            if(res.status === 200){
                localStorage.setItem(USER_ACCESS_TOKEN, res.data.access)
                localStorage.setItem(USER_REFRESH_TOKEN, res.data.refresh)
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