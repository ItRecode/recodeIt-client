import { atom } from 'recoil'

export const formDataAtom = atom({
  key: 'formData',
  default: {
    selectedCategory: 3,
    selectedColor: 'icon-purple',
    selectedIcon: 'gift',
  },
})

export const scrollTarget = atom<{
  scrollReset: boolean
  commentId: number | null
}>({
  key: 'scrollToReply',
  default: { scrollReset: false, commentId: null },
})
