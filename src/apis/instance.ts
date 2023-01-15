import axios from 'axios'

const { REACT_APP_DEV_API_END_POINT } = process.env

const baseInstance = axios.create({
  baseURL: REACT_APP_DEV_API_END_POINT,
  withCredentials: true,
  timeout: 5000,
})

export { baseInstance }
