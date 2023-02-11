import { AxiosResponse } from 'axios'
import { baseInstance } from './instance'
import {
  IMemoryRecordList,
  IMyRecordRequestParam,
  IRecordByDateList,
} from 'types/recordData'

const MEMORY_RECORD_SIZE = 7
const MEMORY_COMMENT_SIZE = 5

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
}: IMyRecordRequestParam): Promise<AxiosResponse<IRecordByDateList>> => {
  return baseInstance.get(`/record`, {
    params: {
      date,
      page,
      size,
    },
  })
}

export const getSearchRecord = ({ keyword, page, size }:) => {
  return baseInstance.get(`/record`, {
    params: {
      searchKeyword: keyword,
      page,
      size,
    },
  })
}
