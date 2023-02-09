import { CELEBRATION_ID } from '@assets/constant/constant'
import React, { useState } from 'react'
import { parentCategoryID } from 'types/category'
import MixRecord from './MixRecord'
import Ranking from './Ranking'
import Together from './Together'
import ParrentCategoryTab from './ParrentCategoryTab'

export default function Main() {
  const [parrentCategoryId, setParrentCategoryId] =
    useState<parentCategoryID>(CELEBRATION_ID)
  return (
    <>
      <div className="h-full w-full">
        <section id="mixRecord">
          <MixRecord />
        </section>
        <section id="tab">
          <ParrentCategoryTab
            parrentCategoryId={parrentCategoryId}
            setParrentCategoryId={setParrentCategoryId}
          />
        </section>
        <section id="Together">
          <Together parrentCategoryId={parrentCategoryId} />
        </section>
        <section id="Ranking">
          <Ranking parrentCategoryId={parrentCategoryId} />
        </section>
      </div>
      <div className="h-[150px] w-full" />
    </>
  )
}
