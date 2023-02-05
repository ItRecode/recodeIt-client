import React, { useState } from 'react'
import MixRecord from './MixRecord'
import Together from './Together'

export default function Main() {
  const [categoryId, setCategoryId] = useState<1 | 2>(1)
  return (
    <div className="h-full w-full">
      <MixRecord />
      <Together categoryId={categoryId} setCategoryId={setCategoryId} />
    </div>
  )
}
