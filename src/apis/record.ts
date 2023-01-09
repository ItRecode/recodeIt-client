import { baseInstance } from './instance'

export const getCategory = () => {
  return baseInstance.get('/record/category')
}

export const enrollRecord = async (data: FormData) => {
  return baseInstance.post('/record', {
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
