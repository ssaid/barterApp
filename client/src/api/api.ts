import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
})


const token = window.localStorage.getItem('token')

if (token) {
  api.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
  )
}
