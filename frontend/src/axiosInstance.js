import axios from 'axios';
import { ADMIN_ACCESS_TOKEN, ADMIN_REFRESH_TOKEN, USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from './constants';


// Create axios instances for user and admin
export const userAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

export const adminAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

// Axios request interceptor for user instance
userAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(USER_ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios request interceptor for admin instance
adminAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default {userAxiosInstance, adminAxiosInstance}
