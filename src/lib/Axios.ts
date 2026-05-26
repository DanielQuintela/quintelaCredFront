import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.API_URL_AXIOS || 'http://localhost:5173',
})