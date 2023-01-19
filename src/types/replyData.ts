export interface CommentData {
  commentId: number
  content: string
  createdAt: string
  imageUrl: string | null
  modifiedAt: string
  numOfSubComment: number
  writer?: string
  Recordwriter?: string
  recordId?: string | undefined
}

export interface CommentRequestDtoType {
  page: number
  parentId: number | null
  recordId: number
  size: number
}
