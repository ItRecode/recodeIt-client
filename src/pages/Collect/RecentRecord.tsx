import React from 'react'
import { ReactComponent as Front } from '@assets/front.svg'
import { ReactComponent as Reset } from '@assets/collect_page_icon/reset.svg'
import { useQuery } from '@tanstack/react-query'
import { getRecentRecordData } from '@apis/record'
import Spinner from '@components/Spinner'
import RecordCard from '@components/RecordCard'
import { CategoryCard } from 'types/recordData'

function RecentRecord() {
  const { data, isLoading } = useQuery(
    ['getRecentRecord', 1],
    () => getRecentRecordData(1),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) {
    return <Spinner size="large" />
  }

  return (
    <div className="relative px-6 pb-20">
      <div className="sticky top-0  left-0 mb-5 bg-grey-1 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center   ">
            <p className="mr-3 text-[18px] font-semibold">최신 레코드</p>
            <Front />
          </div>
          <p className="text-xs font-medium text-grey-8">12: 00 기준</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-grey-8">
            지금 축하받는 레코드는?
          </p>
          <Reset className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {data !== undefined &&
          data.data.content.map(
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
          )}
      </div>
    </div>
  )
}

export default RecentRecord
