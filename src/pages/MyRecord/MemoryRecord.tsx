import React from 'react'
import { IMemoryRecord } from 'types/myRecord'
import { useMemoryRecord } from '@react-query/hooks/useMemoryRecord'
import { ReactComponent as Gift } from '@assets/record_icons/gift.svg'
import { ReactComponent as ArrowDown } from '@assets/myRecordIcon/arrow_down.svg'
import Spinner from '@components/Spinner'
import MemoryRecordCard from './Common/MemoryRecordCard'

export default function MemoryRecord() {
  const {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMemoryRecord()

  if (isLoading) {
    return <></>
  }

  if (!memoryRecord?.pages[0].data.totalCount) {
    return (
      <div className="ml-[2px] mt-6 flex gap-6 px-6">
        <div
          className={`flex h-[86px] w-[86px] items-center rounded-2xl bg-primary-4`}
        >
          <Gift className="flex aspect-square w-full" />
        </div>
        <div className="mt-[25px] text-center">
          <p className="text-sm font-semibold">아직 추억할 레코드가 없어요.</p>
          <p className="mt-1 text-xs">추억을 쌓아보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {memoryRecord.pages.map(({ data }) =>
        data.memoryRecordList.map((memoryRecord: IMemoryRecord) => (
          <MemoryRecordCard
            key={memoryRecord.recordId}
            recordId={memoryRecord.recordId}
            title={memoryRecord.title}
            iconName={memoryRecord.iconName}
            colorName={memoryRecord.colorName}
            memoryRecordComments={memoryRecord.memoryRecordComments}
          />
        ))
      )}
      <div className="relative mb-[130px] h-[160px]">
        {hasNextPage && (
          <button
            className={`w-full bg-grey-1 ${
              !isFetchingNextPage && 'cursor-pointer border-t border-t-grey-3'
            }`}
            onClick={() => fetchNextPage()}
          >
            <div className="flex items-center justify-center py-2">
              {isFetchingNextPage ? (
                <Spinner size="button" />
              ) : (
                <div className="py-2">
                  <span className="text-sm text-primary-2">더보기</span>
                  <ArrowDown className="ml-[10px]" />
                </div>
              )}
            </div>
          </button>
        )}
      </div>
    </>
  )
}
