import { atom } from 'recoil'

export const formDataAtom = atom({
  key: 'formData',
  default: {
    selectedCategory: 3,
    selectedColor: 'icon-purple',
    selectedIcon: 'heart',
  },
})

export const DetailPageInputMode = atom<{
  mode: 'reply' | 'nestedReply'
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
