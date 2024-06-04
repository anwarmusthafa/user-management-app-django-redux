import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",})


    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) =>{ return Promise.reject(error) })


    export default axiosInstance