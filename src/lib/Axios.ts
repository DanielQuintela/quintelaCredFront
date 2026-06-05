import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.API_URL_AXIOS || 'http://localhost:8080',
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { error?: string })?.error ||
      error.message

    return Promise.reject(new Error(message))
  },
)