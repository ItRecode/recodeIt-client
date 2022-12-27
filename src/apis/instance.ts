import axios, { AxiosInstance } from 'axios'
import { getItem } from '@utils/localStorage'
import { redirect } from 'react-router-dom'

const { REACT_APP_DEV_API_END_POINT } = process.env

function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    config.headers = {
      authorization: `Bearer ${getItem('token', '')}`,
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        redirect('/login')
      }

      console.error(error)
      return Promise.reject(error)
    }
  )
  return instance
}

const baseInstance = axios.create({ baseURL: REACT_APP_DEV_API_END_POINT })
const authInstance = setInterceptors(baseInstance)

export { baseInstance, authInstance }
