import axios from 'axios';

const API = axios.create({
  // Ensure this points to your Render URL in production!
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
  withCredentials: true,
  headers: {
    // 🛡️ 'Accept' tells the server what we want back.
    // We REMOVE 'Content-Type' so Axios can auto-detect FormData vs JSON.
    'Accept': 'application/json'
  }
});

// 🛡️ JWT Interceptor: This is what keeps your DB connection authorized
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;