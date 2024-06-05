import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminAxiosInstance } from '../axiosInstance';
import AdminHeader from '../components/AdminHeader';
import './AdminHome.css';

const AdminHome = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await adminAxiosInstance.get('user_details/');
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log('Edit button clicked for ID:', id);
        navigate(`/edit/user/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                adminAxiosInstance.delete(`update_user/${id}/`)
                    .then((res) => {
                        console.log(res.data);
                        setUsers(users.filter((user) => user.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the user.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div>
            <AdminHeader/>
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td className="table-actions">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;
