import axios from 'axios';
import router from '../../feature/Routing/router';

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.navigate('/login')
    }
  }
)