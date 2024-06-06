import React from 'react'
import RegisterForm from '../components/RegisterForm'

function Register( {admin}) {
  return (
    <div>
      < RegisterForm admin={{"status":admin}}/>
    </div>
  )
}

export default Register
