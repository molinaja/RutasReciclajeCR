import axios from 'axios';

const baseURL = `https://localhost:5000/api/`;

const apiInstancia = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiInstancia;
