// src/services/api.js
import axios from 'axios';

export const BASE_URL = '/api'; // Usa proxy en desarrollo

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export function login(credentials) {
  return api
    .post('/auth/login', credentials)
    .then(res => res.data.token);
}

export function getCategories() {
  return api.get('/category').then(res => res.data);
}

export function getLecciones() {
  return api.get('/lecciones').then(res => res.data);
}

export function getGraduates() {
  return api.get('/graduates').then(res => res.data);
}

export function getPodcasts() {
  return api.get('/podcast').then(res => res.data);
}

