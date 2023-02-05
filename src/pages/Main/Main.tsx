import React, { useState } from 'react'
import Together from './Together'

export default function Main() {
  const [categoryId, setCategoryId] = useState<1 | 2>(1)
  return (
    <div className="h-full w-full">
      <Together categoryId={categoryId} setCategoryId={setCategoryId} />
    </div>
  )
}
