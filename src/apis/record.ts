import { parentCategoryID } from './../types/category'
import { baseInstance } from './instance'

export const getCategory = async (categoryId?: parentCategoryID) => {
  return await baseInstance.get('/record/category', {
    params: { parentRecordCategoryId: categoryId },
  })
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

export const deleteRecord = async (recordId: string | undefined) => {
  if (recordId) {
    const res = await baseInstance.delete(`/record/${recordId}`)
    return res.data
  }
}

export const modifyRecord = async (
  recordId: string | undefined,
  data: FormData
) => {
  return baseInstance.put(`/record/${recordId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getRandomRecordData = async (recordCategoryId: 1 | 2) => {
  return await baseInstance.get('/record/random', {
    params: { recordCategoryId, size: 5 },
  })
}

export const getMixRecordData = async () => {
  return await baseInstance.get('/record/mix')
}

export const getRecentRecordData = async (page: number, dateTime: string) => {
  const MAX_RECORD_NUMBER = 10
  return await baseInstance.get('/record/recent', {
    params: { page, size: MAX_RECORD_NUMBER, dateTime },
  })
}

export const getRanking = async (
  recordCategoryId: number,
  rankingPeriod = 'WEEK'
) => {
  return await baseInstance.get('/record/ranking', {
    params: {
      rankingPeriod,
      recordCategoryId,
    },
  })
}

export const getTotalRecordCount = async () => {
  return await baseInstance.get('/record/count')
}
