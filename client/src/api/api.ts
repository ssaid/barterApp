import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
})


const token = localStorage.getItem('token')

if (token) {
  api.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
  )
}


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && window.location.pathname !== '/login'){
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
