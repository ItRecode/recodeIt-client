import React, { useState } from 'react'
// import MixRecord from './MixRecord'
import Together from './Together'
import { ReactComponent as HomeImg } from '@assets/home_img.svg'
import { useNavigate } from 'react-router-dom'

export default function Main() {
  const [categoryId, setCategoryId] = useState<1 | 2>(1)
  const navigate = useNavigate()
  return (
    <>
      <div className="h-full w-full overflow-scroll">
        {/* <MixRecord /> */}
        <div className="w-full cursor-pointer p-0">
          <HomeImg
            width="auto"
            height="auto"
            onClick={() => navigate('/record/31')}
          />
        </div>
        <Together categoryId={categoryId} setCategoryId={setCategoryId} />
      </div>
      <div className="h-[70px] w-full" />
    </>
  )
}
