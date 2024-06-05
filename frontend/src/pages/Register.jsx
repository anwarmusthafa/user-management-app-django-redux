import React from 'react'
import RegisterForm from '../components/RegisterForm'

function Register( admin = false) {
  return (
    <div>
      < RegisterForm admin={admin}/>
    </div>
  )
}

export default Register
