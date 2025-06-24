import axios from 'axios';
import { clearFromLocalstorage } from '../lib/LocalStorage';

// dev ENV localhost:3500/
// prod ENV https://upload-pdf-uni-backend.onrender.com
export let urlEndpoint = 'http://localhost:3500/api/v1';

if (import.meta.env.DEV) {
  urlEndpoint = 'http://localhost:3500/api/v1';
} else {
  urlEndpoint = 'https://upload-pdf-uni-backend.onrender.com/api';
}

export const createInstancePoint = axios.create({
  baseURL: urlEndpoint,
  withCredentials: true,
});

const restrictedRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/verify-code',
  '/reset-password',
];

createInstancePoint.interceptors.response.use(
  (response) => response,
  (error) => {
    const preventRedir = restrictedRoutes.some((route) =>
      window.location.pathname.startsWith(route)
    );

    if (error?.status === 401 && !preventRedir) {
      // Clear user stored data
      clearFromLocalstorage('studentInfo');
      window.location.pathname = '/login';
    }
    return Promise.reject(error);
  }
);
