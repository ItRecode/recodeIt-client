import { baseInstance } from './instance'

const MEMORY_RECORD_SIZE = 7
const MEMORY_COMMENT_SIZE = 5

export const getCategory = () => {
  return baseInstance.get('/record/category')
}

export const enrollRecord = async (data: FormData) => {
  return baseInstance.post('/record', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getRecord = async (recordId: string | undefined) => {
  if (recordId) {
    const res = await baseInstance.get(`/record/${recordId}`)
    return res.data
  }
}

export const getMemoryRecord = (pageParam: number) => {
  return baseInstance.get(`/record/memory`, {
    params: {
      memoryRecordPage: pageParam,
      memoryRecordSize: MEMORY_RECORD_SIZE,
      sizeOfCommentPerRecord: MEMORY_COMMENT_SIZE,
    },
  })
}

export const deleteRecord = async (recordId: string | undefined) => {
  if (recordId) {
    const res = await baseInstance.delete(`/record/${recordId}`)
    return res.data
  }
}
