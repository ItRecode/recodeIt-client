import { CELEBRATION_ID } from '@assets/constant/constant'
import { atom } from 'recoil'
import { parentCategoryID } from 'types/category'

export const parentCategoryIdAtomMainPage = atom<parentCategoryID>({
  key: 'parentCategoryIdMainPage',
  default: CELEBRATION_ID,
})

export const subCategoryIdAtomMainPage = atom<number>({
  key: 'subCategoryIdAtomMainPage',
  default: parentCategoryIdAtomMainPage,
})
