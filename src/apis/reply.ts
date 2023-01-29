import { baseInstance } from './instance'

export const createReply = async (data: FormData) => {
  return await baseInstance.post('/comment', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getReply = async (
  recordId?: string | undefined,
  pageParam?: number,
  parentId?: number,
  size?: number
) => {
  return await baseInstance.get('/comment', {
    params: {
      page: pageParam ? pageParam : 0,
      parentId: parentId ? parentId : '',
      recordId: recordId,
      size: size ? size : 10,
    },
  })
}

export const deleteReply = async (
  commentId: number,
  recordId: string | undefined
) => {
  return await baseInstance.delete(`/comment/${commentId}?recordId=${recordId}`)
}
