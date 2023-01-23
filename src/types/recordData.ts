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

export interface ITodayRecord {
  title: string
  categoryName: string
  commentCount: number
  iconName: string
  colorName: string
  createdAt: string
}

export interface IMemoryRecordList {
  hasNextPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  memoryRecordList: IMemoryRecord[]
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
