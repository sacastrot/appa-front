import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
let BaseApi = axios.create({
    baseURL: BASE_URL,
});

BaseApi.interceptors.request.use(
    (config) => {
        let token = "";
        let userData = window.sessionStorage.getItem("userData");
        if (userData) {
            userData = atob(userData);
            token = JSON.parse(userData).access;
        }
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default BaseApi;