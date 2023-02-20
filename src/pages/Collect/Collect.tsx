import React, { useRef, useState } from 'react'
import { usePreviousUrlWithStorage } from '@react-query/hooks/usePreviousUrlWithStorage'
import RecentRecord from './RecentRecord'
import { ReactComponent as ScrollTop } from '@assets/collect_page_icon/scrollTop.svg'
import CollectRanking from './CollectRanking'
import PeriodModal from './PeriodModal'
import { keyOfRankingPeriod } from '@assets/constant/ranking'
import { useRecoilState } from 'recoil'
import { rankingPeriodAtom } from '@store/collectPageAtom'

export default function Collect() {
  const collectRef: React.RefObject<HTMLDivElement> = useRef(null)
  const [isScroll, setIsScroll] = useState(false)

  const [rankingPeriod, setRankingPeriod] =
    useRecoilState<keyOfRankingPeriod>(rankingPeriodAtom)
  const [openModal, setOpenModal] = useState(false)

  const NAVBAR_HEIGHT = 60
  const SCROLL_BUTTON_SIZE = 39
  const SCROLL_BUTTON_POSITION_Y = 12
  const VIEWPORT_WIDTH = (window.innerWidth > 420 ? 420 : window.innerWidth) / 2
  const SCROLL_BUTTON_POSITION_X = 16

  const handleScrollTop = () => {
    if (collectRef.current !== null) {
      collectRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    if (collectRef.current?.scrollTop === 0) {
      return setIsScroll(false)
    }
    if (isScroll) return
    setIsScroll(true)
  }

  const getLeftValue = () => {
    return `calc(50% + ${
      VIEWPORT_WIDTH - SCROLL_BUTTON_SIZE - SCROLL_BUTTON_POSITION_X
    }px)`
  }

  const getTopValue = () => {
    return `${
      window.innerHeight -
      NAVBAR_HEIGHT -
      SCROLL_BUTTON_SIZE -
      SCROLL_BUTTON_POSITION_Y
    }px`
  }

  usePreviousUrlWithStorage('sessionStorage')
  return (
    <div
      onScroll={handleScroll}
      ref={collectRef}
      className="flex h-screen flex-col overflow-scroll"
    >
      {openModal && (
        <PeriodModal
          setRankingPeriod={setRankingPeriod}
          setOpenModal={setOpenModal}
        />
      )}
      <div>
        {isScroll && (
          <ScrollTop
            onClick={() => handleScrollTop()}
            style={{ left: getLeftValue(), top: getTopValue() }}
            className={`fixed z-[20] cursor-pointer`}
          />
        )}
        <section id="ranking" className="w-full">
          <CollectRanking
            setOpenModal={setOpenModal}
            rankingPeriod={rankingPeriod}
            setRankingPeriod={setRankingPeriod}
          />
        </section>
        <RecentRecord />
      </div>
    </div>
  )
}
