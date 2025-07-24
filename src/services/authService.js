import { BASE_URL } from './api';
import axios from 'axios';

export async function signIn(email, password) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

    console.log('Respuesta login:', res.data);

    const token = res.data.token || res.data.accessToken || res.data.jwt;
    if (!token) {
      throw new Error('Token no encontrado en la respuesta');
    }

    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    console.error('Error en signIn:', err.response?.data || err.message);
    throw err;
  }
}

export async function registerUser({ name, email, password }) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });

    console.log('Respuesta registro:', res.data);

    const token = res.data.token || res.data.accessToken || res.data.jwt;
    if (!token) {
      throw new Error('Token no encontrado en la respuesta');
    }

    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    console.error('Error en registerUser:', err.response?.data || err.message);
    throw err;
  }
}

