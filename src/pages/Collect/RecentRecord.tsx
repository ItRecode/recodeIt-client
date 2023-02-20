import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Reset } from '@assets/collect_page_icon/reset.svg'
import { ReactComponent as ResetDisabled } from '@assets/collect_page_icon/reset_disabled.svg'
import Spinner from '@components/Spinner'
import RecordCard from '@components/RecordCard'
import { CategoryCard } from 'types/recordData'
import { useRecentRecord } from '@react-query/hooks/useRecentRecord'
import { useIntersect } from '@hooks/useIntersectionObserver'
import { GetCurrentTime } from '@utils/getCurrentTime'
import { SessionStorage } from '@utils/sessionStorage'
import { getTimeGap } from '@utils/getTimeGap'
import Timer from './Timer'
import { RESET_TIME } from '@assets/constant/collect'

function RecentRecord() {
  const { recentRecord, isLoading, hasNextPage, fetchNextPage, reset } =
    useRecentRecord()
  const [timer, setTimer] = useState(0)
  const interval: { current: NodeJS.Timeout | undefined } = useRef()
  const recentRef: React.RefObject<HTMLDivElement> = useRef(null)

  const scrollRecentViewTop = () => {
    if (recentRef.current !== null) {
      recentRef.current.scrollIntoView({
        block: 'start',
      })
    }
  }

  useEffect(() => {
    if (SessionStorage.get('previousPage') === 'detailPage') {
      scrollRecentViewTop()
      SessionStorage.remove('previousPage')
    }
  }, [])

  useEffect(() => {
    const getTimer = Number(SessionStorage.get('resetTime')) as number
    const timeGapByTimer = getTimeGap(getTimer)
    if (timeGapByTimer >= RESET_TIME) {
      setTimer(0)
      SessionStorage.remove('resetTime')
      return () => clearInterval(interval.current)
    }
    interval.current = setInterval(() => {
      const TIME_GAP_BY_INTERVAL = 1
      setTimer(timeGapByTimer + TIME_GAP_BY_INTERVAL)
    }, 1000)
    return () => clearInterval(interval.current)
  }, [timer])

  const scrollEndRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  })

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner size="large" />
      </div>
    )
  }

  const handleReset = () => {
    reset()
    SessionStorage.set('resetTime', JSON.stringify(new Date().getTime()))
    setTimer(RESET_TIME)
    scrollRecentViewTop()
  }

  const getTime = () => {
    const getCurrentTime = new GetCurrentTime()
    return `${getCurrentTime.getHours()} : ${getCurrentTime.getMinutes()}`
  }

  return (
    <div ref={recentRef}>
      <div className="relative px-6 pb-20">
        <div className="sticky top-0 left-0 mb-5 flex flex-col justify-center bg-grey-1 py-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center   ">
              <p className="mr-3 text-[18px] font-semibold">최신 레코드</p>
            </div>
            <p className="text-xs font-medium text-grey-8">{`${getTime()} 기준`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-grey-8">
              지금 올라오고 있는 레코드는?
            </p>
            <div className=" flex w-[10%] flex-col items-center justify-center">
              {timer === 0 ? (
                <Reset onClick={handleReset} className="cursor-pointer" />
              ) : (
                <ResetDisabled />
              )}
              {timer !== 0 ? <Timer /> : ''}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentRecord !== null &&
            recentRecord.pages.map(({ data }) =>
              data.content.map(
                ({
                  recordId,
                  title,
                  colorName,
                  commentCount,
                  iconName,
                }: CategoryCard) => {
                  const ColorName = `bg-${colorName}`
                  return (
                    <div
                      className={`h-[200px] w-[calc(50%-4px)] rounded-2xl ${ColorName} flex justify-center `}
                      key={recordId}
                    >
                      <RecordCard
                        type="recentRecord"
                        recordId={recordId}
                        title={title}
                        colorName={colorName}
                        commentCount={commentCount}
                        iconName={iconName}
                      />
                    </div>
                  )
                }
              )
            )}
        </div>
        <div ref={scrollEndRef} className="h-10 w-full " />
        {hasNextPage && (
          <div className="flex w-full justify-center">
            <Spinner size="small" />
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentRecord
