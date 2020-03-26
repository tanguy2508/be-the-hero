import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bethehero-tanguy2508.herokuapp.com',
});

export default api;