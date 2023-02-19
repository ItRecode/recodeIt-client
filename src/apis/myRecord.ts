import { AxiosResponse } from 'axios'
import { baseInstance } from './instance'
import {
  IMemoryRecordList,
  IMyRecordByDateList,
  IMyRecordByKeywordList,
  IMyRecordRequestParam,
  IRecordWithMonthYear,
} from 'types/myRecord'

const MEMORY_RECORD_SIZE = 7
const MEMORY_COMMENT_SIZE = 5
const MY_RECORD_KEYWORD_SIZE = 10

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

export const getRecordByDate = ({
  date,
  page,
  size,
}: IMyRecordRequestParam): Promise<AxiosResponse<IMyRecordByDateList>> => {
  return baseInstance.get(`/record`, {
    params: {
      date,
      page,
      size,
    },
  })
}

export const getRecordByKeyword = (
  pageParam: number,
  keyword: string
): Promise<AxiosResponse<IMyRecordByKeywordList>> => {
  return baseInstance.get(`/record/search`, {
    params: {
      searchKeyword: keyword,
      page: pageParam,
      size: MY_RECORD_KEYWORD_SIZE,
    },
  })
}

export const getRecordByMonthYear = (
  yearMonth: string
): Promise<AxiosResponse<IRecordWithMonthYear>> => {
  return baseInstance.get(`/record/days`, {
    params: {
      yearMonth,
    },
  })
}
