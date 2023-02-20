import { atom } from 'recoil'

export const searchedKeyword = atom<{
  keyword: string
}>({
  key: 'searchedKeyword',
  default: {
    keyword: '',
  },
})
