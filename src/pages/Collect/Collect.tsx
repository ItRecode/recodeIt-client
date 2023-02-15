
import React, { useRef, useState } from 'react'
import { usePreviousUrlWithStorage } from '@react-query/hooks/usePreviousUrlWithStorage'
import RecentRecord from './RecentRecord'
import { ReactComponent as ScrollTop } from '@assets/collect_page_icon/scrollTop.svg'

export default function Collect() {
  const collectRef: React.RefObject<HTMLDivElement> = useRef(null)
  const [isScroll, setIsScroll] = useState(false)

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

  const getViewPort = () => {
    const NAVBAR_HEIGHT = 60
    const SCROLL_BUTTON_SIZE = 39
    const SCROLL_BUTTON_POSITION_Y = 12
    const VIEWPORT_WIDTH =
      (window.innerWidth > 420 ? 420 : window.innerWidth) / 2
    const SCROLL_BUTTON_POSITION_X = 16
    return `top-[${
      window.innerHeight -
      NAVBAR_HEIGHT -
      SCROLL_BUTTON_SIZE -
      SCROLL_BUTTON_POSITION_Y
    }px] left-[calc(50%+${
      VIEWPORT_WIDTH - SCROLL_BUTTON_SIZE - SCROLL_BUTTON_POSITION_X
    }px)]`
  }
  usePreviousUrlWithStorage('sessionStorage')
  return (
    <div
      onScroll={handleScroll}
      ref={collectRef}
      className="flex h-screen flex-col overflow-scroll"
    >
      <div>
        {isScroll && (
          <ScrollTop
            onClick={() => handleScrollTop()}
            className={`fixed ${getViewPort()} z-[9999] cursor-pointer`}
          />
        )}
        <div className="h-[1000px] bg-primary-6">1</div>
        <div className="h-[1000px] bg-primary-6">1</div>
        <RecentRecord />
      </div>
    </div>
  )
}
