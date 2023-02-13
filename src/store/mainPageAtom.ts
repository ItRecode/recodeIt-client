import { CELEBRATION_ID } from '@assets/constant/constant'
import { atom } from 'recoil'
import { parentCategoryID } from 'types/category'

export const parentCategoryIdAtom = atom<parentCategoryID>({
  key: 'parentCategoryId',
  default: CELEBRATION_ID,
})
