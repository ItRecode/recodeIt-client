import ParentCategoryTab from '@components/ParrentCategoryTab'
import { usePreviousUrlWithStorage } from '@react-query/hooks/usePreviousUrlWithStorage'
import { parentCategoryIdAtom } from '@store/mainPageAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import { parentCategoryID } from 'types/category'
import MixRecord from './MixRecord'
import Ranking from './Ranking'
import Together from './Together'

export default function Main() {
  const [parentCategoryID, setParentCategoryID] =
    useRecoilState<parentCategoryID>(parentCategoryIdAtom)
  usePreviousUrlWithStorage('sessionStorage')
  return (
    <>
      <section id="mixRecord">
        <MixRecord />
      </section>
      <section id="tab" className="pt-3.5">
        <ParentCategoryTab
          parentCategoryId={parentCategoryID}
          setParentCategoryId={setParentCategoryID}
        />
      </section>
      <section id="Together">
        <Together parentCategoryId={parentCategoryID} />
      </section>
      <section id="Ranking">
        <Ranking parentCategoryId={parentCategoryID} />
      </section>
      <div className="h-[120px] w-full" />
    </>
  )
}
