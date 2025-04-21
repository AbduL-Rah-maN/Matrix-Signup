import axios from 'axios';

const API_BASE_URL = 'https://matrix-signup-3.onrender.com/api';

export const getItems = () => {
  return axios.get(`${API_BASE_URL}/items`);
};

export const addItem = (item) => {
  return axios.post(`${API_BASE_URL}/items`, item, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const updateItem = (id, item) => {
  return axios.put(`${API_BASE_URL}/items/${id}`, item, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deleteItem = (id) => {
  return axios.delete(`${API_BASE_URL}/items/${id}`);
};