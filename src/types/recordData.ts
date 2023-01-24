export interface IRecordDataType {
  recordId: number
  categoryId: number
  categoryName: string
  title: string
  content: string
  writer: string
  colorName: string
  iconName: string
  createdAt: string
  imageUrls: string[]
}

export interface IMemoryRecordList {
  memoryRecordList: IMemoryRecord[]
  totalCount: number
  totalPage: number
}

export interface IMemoryRecord {
  recordId: number
  title: string
  iconName: string
  iconColor: string
  memoryRecordComments: IRecordMemoryComment[]
}

export interface IRecordMemoryComment {
  commentId: number
  content: string
}

export interface IRecordByDate {
  recordId: number
  title: string
  categoryName: string
  commentCount: number
  iconName: string
  colorName: string
  createdAt: string
}

export interface IRecordByDateList {
  recordByDateDtos: IRecordByDate[]
  totalCount: number
  totalPage: number
}

export interface IMyRecordRequestParam {
  date: string
  page: number
  size: number
}
