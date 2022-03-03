import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    ((config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = '/login';
            localStorage.removeItem('access_token');
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
