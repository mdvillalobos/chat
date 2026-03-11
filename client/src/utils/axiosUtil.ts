
import axios from "axios";
import {useUser} from "../../context/userContext.tsx";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Response interceptor (handle 401 globally)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { setUser } = useUser();
        if (error.response?.status === 401) {
            setUser(null)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;