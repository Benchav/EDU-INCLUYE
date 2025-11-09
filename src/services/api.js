import axios from 'axios';

export const BASE_URL = '/api'; 

const api = axios.create({ baseURL: BASE_URL });


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(res => res, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(err);
});


export function getContent() {
  return api.get('/content').then(r => r.data);
}


export function getContentByCategory(idCategoria, page = 1, pageSize = 100) {
  return api
    .post('/content/contents-by-category-paginated', { idCategoria, page, pageSize })
    .then(r => r.data);
}


export function getCategories()  { return api.get('/category').then(r => r.data); }
export function getLecciones()   { return api.get('/lecciones').then(r => r.data); }
export function getGraduates()   { return api.get('/graduates').then(r => r.data); }
export function getPodcasts()    { return api.get('/podcast').then(r => r.data); }
export function login(credentials) {
  return api.post('/auth/login', credentials).then(r => r.data.token);
}