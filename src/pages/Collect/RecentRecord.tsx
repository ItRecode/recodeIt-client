import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Reset } from '@assets/collect_page_icon/reset.svg'
import { ReactComponent as ResetDisabled } from '@assets/collect_page_icon/reset_disabled.svg'
import Spinner from '@components/Spinner'
import RecordCard from '@components/RecordCard'
import { CategoryCard } from 'types/recordData'
import { useRecentRecord } from '@react-query/hooks/useRecentRecord'
import { useIntersect } from '@hooks/useIntersectionObserver'
import { getCurrentTime } from '@utils/getCurrentTime'
import { LocalStorage } from '@utils/localStorage'

function RecentRecord() {
  const { recentRecord, isLoading, hasNextPage, fetchNextPage, reset } =
    useRecentRecord()
  const [timer, setTimer] = useState(0)
  const interval: { current: NodeJS.Timeout | undefined } = useRef()

  useEffect(() => {
    const getTimer = LocalStorage.get('timer')
    const RESET_TIME = 5
    const timeGapByTimer =
      getTimer !== null &&
      Math.floor((new Date().getTime() - JSON.parse(getTimer)) / 1000)
    if (timeGapByTimer >= RESET_TIME) {
      setTimer(0)
      LocalStorage.remove('timer')
      return () => clearInterval(interval.current)
    }
    if (timeGapByTimer !== false) {
      interval.current = setInterval(() => {
        const TIME_GAP_BY_INTERVAL = 1
        setTimer(timeGapByTimer + TIME_GAP_BY_INTERVAL)
      }, 1000)
      return () => clearInterval(interval.current)
    }
  }, [timer])

  const recentRef: React.RefObject<HTMLDivElement> = useRef(null)

  const scrollEndRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  })

  if (isLoading) {
    return <Spinner size="large" />
  }

  const handleReset = () => {
    reset()
    LocalStorage.set('timer', JSON.stringify(new Date().getTime()))
    setTimer(180)
    if (recentRef.current !== null) {
      recentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="relative px-6 pb-20">
      <div className="sticky top-0  left-0 mb-5 bg-grey-1 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center   ">
            <p className="mr-3 text-[18px] font-semibold">최신 레코드</p>
          </div>
          <p className="text-xs font-medium text-grey-8">
            {`${getCurrentTime.getHours()}`}: {`${getCurrentTime.getMinutes()}`}{' '}
            기준
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-grey-8">
            지금 축하받는 레코드는?
          </p>
          {timer === 0 ? (
            <Reset onClick={handleReset} className="cursor-pointer" />
          ) : (
            <ResetDisabled />
          )}
        </div>
      </div>
      <div ref={recentRef} className="flex flex-wrap gap-2">
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
  )
}

export default RecentRecord
