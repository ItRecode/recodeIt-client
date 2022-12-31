import axios, { AxiosInstance } from 'axios'
import { redirect } from 'react-router-dom'

const { REACT_APP_DEV_API_END_POINT } = process.env

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        redirect('/login')
      }

      return Promise.reject(error)
    }
  )
  return instance
}

const baseInstance = axios.create({
  baseURL: REACT_APP_DEV_API_END_POINT,
  withCredentials: true,
})
const authInstance = setInterceptors(baseInstance)

export { baseInstance, authInstance }
