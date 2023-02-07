import { CELEBRATION_ID } from '@assets/constant/constant'
import React, { useState } from 'react'
import { parentCategoryID } from 'types/category'
import MixRecord from './MixRecord'
import Together from './Together'

export default function Main() {
  const [categoryId, setCategoryId] = useState<parentCategoryID>(CELEBRATION_ID)
  return (
    <>
      <div className="h-full w-full">
        <MixRecord />
        <Together categoryId={categoryId} setCategoryId={setCategoryId} />
      </div>
      <div className="h-[110px] w-full" />
    </>
  )
}
