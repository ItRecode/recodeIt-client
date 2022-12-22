import axios from 'axios'
import { getItem } from '@utils/localStorage'
import { redirect } from 'react-router-dom'

const { REACT_APP_DEV_API_END_POINT } = process.env

const baseInstance = axios.create({ baseURL: REACT_APP_DEV_API_END_POINT })
const authInstance = axios.create({ baseURL: REACT_APP_DEV_API_END_POINT })

authInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${getItem('token', '')}`,
  }
  return config
})

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      redirect('/login')
      return
    }

    console.error(error)
    return Promise.reject(error)
  }
)

export { baseInstance, authInstance }
