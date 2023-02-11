import { CELEBRATION_ID } from '@assets/constant/constant'
import ParentCategoryTab from '@components/ParrentCategoryTab'
import React, { useState } from 'react'
import { parentCategoryID } from 'types/category'
import MixRecord from './MixRecord'
import Ranking from './Ranking'
import Together from './Together'

export default function Main() {
  const [parentCategoryId, setParentCategoryId] =
    useState<parentCategoryID>(CELEBRATION_ID)
  return (
    <>
      <section id="mixRecord">
        <MixRecord />
      </section>
      <section id="tab" className="pt-3.5">
        <ParentCategoryTab
          parentCategoryId={parentCategoryId}
          setParentCategoryId={setParentCategoryId}
        />
      </section>
      <section id="Together">
        <Together parentCategoryId={parentCategoryId} />
      </section>
      <section id="Ranking">
        <Ranking parentCategoryId={parentCategoryId} />
      </section>
      <div className="h-[150px] w-full" />
    </>
  )
}
