import axios from 'axios';

const API = axios.create({ 
  baseURL: 'https://crud-with-drf-1.onrender.com/api/'
});

export const getItems    = ()         => API.get('/');
export const createItem  = (data)     => API.post('/', data);
export const updateItem  = (id, data) => API.put(`/${id}/`, data);
export const deleteItem  = (id)       => API.delete(`/${id}/`);
export const toggleItem  = (id)       => API.post(`/${id}/toggle/`);