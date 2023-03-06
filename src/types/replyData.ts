export interface CommentData {
  commentId: number
  content: string
  createdAt: string
  imageUrl: string | null
  modifiedAt: string
  numOfSubComment: number
  writer?: string
  recordwriter?: string
  recordId?: string | undefined
}

export interface CommentRequestDtoType {
  page: number
  parentId: number | null
  recordId: number
  size: number
}

export interface MyCommentType {
  commentCreatedAt: string
  commentId: number
  content: string
  nickname: string
}

export interface MyRepliesType {
  categoryName: string
  colorName: string
  commentsCount: number
  iconName: string
  myCommentDtos: []
  recordCreatedAt: string
  recordId: number
  title: string
}

export interface DeleteReplyType {
  commentId: number
  recordId: string | undefined
}
