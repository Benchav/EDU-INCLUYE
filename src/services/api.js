// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://edu-incluye-backend.vercel.app';

export async function getLecciones() {
  const res = await axios.get(`${BASE_URL}/lecciones`);
  return res.data;      // asume que la API retorna un array de lecciones
}

export async function getGlosario() {
  const res = await axios.get(`${BASE_URL}/glosario`);
  return res.data;      // asume que la API retorna un array de entradas de glosario
}
