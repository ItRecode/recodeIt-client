import { baseInstance } from './instance'

export const createReply = async (data: FormData) => {
  return baseInstance.post('/comment', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getReply = async (recordId: number) => {
  if (recordId) {
    return await baseInstance.get(`/comment`)
  }
}
