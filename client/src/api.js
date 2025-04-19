import axios from 'axios';

// This will pull the API base URL from your .env file
const API = `${import.meta.env.VITE_API_URL}/items`;

export const getItems = () => axios.get(API);
export const addItem = (item) => axios.post(API, item);
export const updateItem = (id, item) => axios.put(`${API}/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API}/${id}`);
