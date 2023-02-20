import ParentCategoryTab from '@components/ParrentCategoryTab'
import { usePreviousUrlWithStorage } from '@react-query/hooks/usePreviousUrlWithStorage'
import { parentCategoryIdAtomMainPage } from '@store/mainPageAtom'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { parentCategoryID } from 'types/category'
// import MixRecord from './MixRecord'
import Ranking from './Ranking'
import Together from './Together'
import { ReactComponent as HomeImg } from '@assets/home_img.svg'
import { useNavigate } from 'react-router-dom'
import { checkFromDetailPage } from '@store/detailPageAtom'
import { CELEBRATION_ID } from '@assets/constant/constant'

export default function Main() {
  const [parentCategoryID, setParentCategoryID] =
    useRecoilState<parentCategoryID>(parentCategoryIdAtomMainPage)

  usePreviousUrlWithStorage('sessionStorage')

  const navigate = useNavigate()
  const isFromDetailPage = useRecoilValue(checkFromDetailPage)

  useEffect(() => {
    if (!isFromDetailPage) {
      setParentCategoryID(CELEBRATION_ID)
    }
  }, [])

  return (
    <>
      <section id="mixRecord">
        {/* <MixRecord /> */}
        <div className="w-full cursor-pointer p-0">
          <HomeImg
            width="100%"
            height="100%"
            onClick={() => navigate('/record/31')}
          />
        </div>
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
