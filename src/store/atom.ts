import { atom } from 'recoil'

export const formDataAtom = atom({
  key: 'formData',
  default: {
    selectedCategory: 3,
    selectedColor: 'icon-purple',
    selectedIcon: 'gift',
  },
})

export const DetailPageInputMode = atom<{
  mode: 'reply' | 'nestedReply' | 'update'
  recordId: string | undefined
  parentId: number | string
}>({
  key: 'DetailPageInputMode',
  default: {
    mode: 'reply',
    recordId: '',
    parentId: '',
  },
})

export const nestedReplyState = atom({
  key: 'nestedReplyState',
  default: {
    commentId: 0,
    state: false,
  },
})

export const modifyComment = atom<{
  commentId: number
  content: string
  imageUrl: string
}>({
  key: 'modifyComment',
  default: {
    commentId: 0,
    content: '',
    imageUrl: '',
  },
})

export const scrollTarget = atom<{
  scrollReset: boolean
  commentId: number | null
}>({
  key: 'scrollToReply',
  default: { scrollReset: false, commentId: null },
})
