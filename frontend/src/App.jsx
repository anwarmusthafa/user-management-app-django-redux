import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AdminHome from './pages/AdminHome'
import AdminLoginForm from './components/AdminLoginForm'
import UpdateForm from './components/UpdateForm'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  

  return (
    <>
     
     <BrowserRouter>
      <Routes>
        <Route path='/' element={ <ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/admin/home' element={ <ProtectedRoute admin={true}>< AdminHome  /></ProtectedRoute>} />
        <Route path='/login' element={ <Login/> } />
        <Route path='/admin/login' element={ <AdminLoginForm/> } />
        <Route path='/logout' element={ <Logout/> } />
        <Route path='/register' element={ <RegisterAndLogout/> } />
        <Route path='/add_user' element={ <Register admin={true} /> } />
        <Route path='/edit/user/:id' element={ <ProtectedRoute admin={true}>< UpdateForm  /></ProtectedRoute>} />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
