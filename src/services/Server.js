import axios from 'axios';
import User from './User';

const server = axios.create({
  baseURL: "https://localhost:8000"
});

server.interceptors.request.use((config) => {
  const token = User.getUserToken();
  config.headers['x-access-token'] = token;
  return config;
}, (err) => {
  Promise.reject(err)
});

export default server;