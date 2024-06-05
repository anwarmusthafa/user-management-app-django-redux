import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin/login/');
    };
    const handleAddUser = () => {
        navigate('/add_user');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">User Management System</a>
                <div className="collapse navbar-collapse justify-content-center">
                    <form className="d-flex" style={{ width: '50%' }}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
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
