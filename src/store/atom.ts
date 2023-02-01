import { TEXT_DETAILS } from '@assets/constant/constant'
import { IconType } from '@pages/AddRecord/AddRecordIcon'
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

export const recordTypeAtom = atom<keyof IconType>({
  key: 'recordType',
  default: TEXT_DETAILS.CELEBRATION,
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

export const scrollTarget = atom<number | null>({
  key: 'scrollToReply',
  default: null,
})
