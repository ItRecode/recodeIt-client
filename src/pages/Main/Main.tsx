import React, { useState } from 'react'
// import MixRecord from './MixRecord'
import Together from './Together'
import { ReactComponent as HomeImg } from '@assets/home_img.svg'

export default function Main() {
  const [categoryId, setCategoryId] = useState<1 | 2>(1)
  return (
    <>
      <div className="h-full w-full overflow-scroll">
        {/* <MixRecord /> */}
        <div className="w-full">
          <HomeImg width="auto" height="auto" />
        </div>
        <Together categoryId={categoryId} setCategoryId={setCategoryId} />
      </div>
      <div className="h-[70px] w-full" />
    </>
  )
}
