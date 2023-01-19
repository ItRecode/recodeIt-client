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

export interface IRecordTodayData {
  title: string
  categoryName: string
  commentCount: number
  iconName: string
  colorName: string
  createdAt: string
}

export interface IRecordMemoryDataItem {
  recordId: number
  title: string
  iconName: string
  colorName: string
  commentList: IRecordMemoryCommentItem[]
}

export interface IRecordMemoryCommentItem {
  commentId: number
  content: string
}
