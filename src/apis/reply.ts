import { baseInstance } from './instance'

export const createReply = async (data: FormData) => {
  return baseInstance.post('/comment', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getReply = async (
  pageParam: number,
  recordId?: string | undefined,
  parentId?: number
) => {
  return await baseInstance.get('/comment', {
    params: {
      page: pageParam,
      parentId: parentId ? parentId : '',
      recordId: recordId,
      size: 10,
    },
  })
}
