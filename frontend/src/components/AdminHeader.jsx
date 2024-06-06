import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adminAxiosInstance } from '../axiosInstance';

const AdminHeader = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin/login/');
    };
    const handleAddUser = () => {
        navigate('/add_user');
    };
    const handleSearch = (e)=>{
        e.preventDefault();
        adminAxiosInstance.get(`/search_user/?query=${query}`).then(
            response =>{
                onSearch(response.data);
            }
        ).catch(
            error => console.log("error while searching",error)
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={()=> navigate('/admin/home/')} >User Management System</a>
                <div className="collapse navbar-collapse justify-content-center">
                    <form className="d-flex" style={{ width: '50%' }}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit" onClick={handleSearch} >Search</button>
                    </form>
                </div>
                <button className="btn btn-success"  onClick={handleAddUser} style={{ marginRight:'5px' }}>
                Add New User
            </button>
                <div className="d-flex mr-5">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default AdminHeader;
