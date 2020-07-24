import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.126:3333',
})//BASE DO NODE

export default api;