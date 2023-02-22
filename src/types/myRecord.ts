import { RecordCategory } from './recordData'
import { PaginationRequest } from './request'
import { PaginationResponse } from './response'

// 추억 레코드
interface IRecordMemoryComment {
  commentId: number
  content: string
}

export interface IMemoryRecord extends RecordCategory {
  memoryRecordComments: IRecordMemoryComment[]
}

export interface IMemoryRecordList extends PaginationResponse {
  memoryRecordList: IMemoryRecord[]
}

// 마이 레코드
export interface IMyRecord {
  recordId: number
  title: string
  categoryName: string
  commentCount: number
  iconName: string
  colorName: string
  createdAt: string
}

export interface IMyRecordByDateList extends PaginationResponse {
  recordByDateDtos: IMyRecord[]
}

export interface IMyRecordByKeywordList extends PaginationResponse {
  recordBySearchDtos: IMyRecord[]
}

export interface IMyRecordRequestParam extends PaginationRequest {
  date: string
}

export interface IMyRecordByKeywordRequestParam extends PaginationRequest {
  keyword: string
}

export interface IRecordWithMonthYear {
  writtenRecordDayDto: number[]
}
