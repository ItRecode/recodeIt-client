import { IMemoryRecord } from './myRecord'

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

export interface RecordCategory {
  recordId: number
  title: string
  iconName: string
  iconColor: string
}

export interface CategoryCard {
  colorName: string
  commentCount: number
  iconName: string
  recordId: number
  title: string
}

export interface IRandomRecordData
  extends Omit<IMemoryRecord, 'memoryRecordComments' | 'iconColor'> {
  commentCount: number
  colorName: string
}

export interface IMixRecordData {
  recordId: number
  colorName: string
  iconName: string
  commentId: number
  commentContent: string
}
