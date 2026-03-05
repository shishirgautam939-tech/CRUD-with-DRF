import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://127.0.0.1:8000/api'
});

export const getItems    = ()         => API.get('/');
export const createItem  = (data)     => API.post('/', data);
export const updateItem  = (id, data) => API.put(`/${id}/`, data);
export const deleteItem  = (id)       => API.delete(`/${id}/`);
export const toggleItem  = (id)       => API.post(`/${id}/toggle/`);