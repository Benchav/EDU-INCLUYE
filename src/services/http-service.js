const BASE_URL = 'https://edu-incluye-backend.vercel.app';

export default class HTTPService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async getToken() {

    return localStorage.getItem('token') || '';
  }

  async get(path) {
    const token = await this.getToken();
    const url = `${this.baseUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error GET:', errorText);
        throw new Error('Error en GET');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async post(path, body) {
    const token = await this.getToken();
    const url = `${this.baseUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error POST:', errorText);
        throw new Error('Error en POST');
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async put(path, body) {
    const token = await this.getToken();
    const url = `${this.baseUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error PUT:', errorText);
        throw new Error('Error en PUT');
      }
      return await response.json();
    } catch (error) {
      console.error('Error putting data:', error);
      throw error;
    }
  }

  async delete(path) {
    const token = await this.getToken();
    const url = `${this.baseUrl}/${path}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error DELETE:', errorText);
        throw new Error('Error en DELETE');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}