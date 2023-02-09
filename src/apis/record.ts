import { parentCategoryID } from './../types/category'
import { AxiosResponse } from 'axios'
import {
  IMemoryRecordList,
  IMyRecordRequestParam,
  IRecordByDateList,
} from 'types/recordData'
import { baseInstance } from './instance'

const MEMORY_RECORD_SIZE = 7
const MEMORY_COMMENT_SIZE = 5

export const getCategory = async (categotyId: parentCategoryID) => {
  return await baseInstance.get('/record/category', {
    params: { parentRecordCategoryId: categotyId },
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

export const getMemoryRecord = (
  pageParam: number
): Promise<AxiosResponse<IMemoryRecordList>> => {
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

export const modifyRecord = async (
  recordId: string | undefined,
  data: FormData
) => {
  return baseInstance.put(`/record/${recordId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getRecordByDate = ({
  date,
  page,
  size,
}: IMyRecordRequestParam): Promise<AxiosResponse<IRecordByDateList>> => {
  return baseInstance.get(`/record`, {
    params: {
      date,
      page,
      size,
    },
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
