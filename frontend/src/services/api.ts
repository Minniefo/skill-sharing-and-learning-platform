// src/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosHeaders } from 'axios';

// API base URL - using proxy from Vite
const API_BASE_URL = '/api'; // Vite proxy will forward to your backend (e.g., http://localhost:8081)

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = new AxiosHeaders({
        ...config.headers, // preserve existing headers
        Authorization: `Bearer ${token}`, // Correct template literal
      });
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
