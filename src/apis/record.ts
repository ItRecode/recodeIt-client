import { baseInstance } from './instance'

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
  return baseInstance.get(`/record/memory-list`, {
    params: {
      pageNum: pageParam,
    },
  })
}
