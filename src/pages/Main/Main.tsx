import ParentCategoryTab from '@components/ParrentCategoryTab'
import { useStorage } from '@react-query/hooks/useStorage'
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
  useStorage('sessionStorage')
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
      <div className="h-[150px] w-full" />
    </>
  )
}
