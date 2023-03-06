import { keyOfRankingPeriod } from './../assets/constant/ranking'
import { CELEBRATION_ID } from './../assets/constant/constant'
import { parentCategoryID } from './../types/category'
import { atom } from 'recoil'

export const parentCategoryIdAtomColletPage = atom<parentCategoryID>({
  key: 'parentCategoryIdCollectPage',
  default: CELEBRATION_ID,
})

export const subCategoryIdAtomCollectPage = atom<number>({
  key: 'subCategoryIdAtomCollectPage',
  default: parentCategoryIdAtomColletPage,
})

export const rankingPeriodAtom = atom<keyOfRankingPeriod>({
  key: 'rankingPeriodAtom',
  default: 'TOTAL',
})
