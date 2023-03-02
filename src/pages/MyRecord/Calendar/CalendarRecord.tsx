import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Calendar from './Calendar'
import BackButton from '@components/BackButton'
import Spinner from '@components/Spinner'
import MemoryRecordCard from '../Common/MemoryRecordCard'
import { useMemoryRecord } from '@react-query/hooks/useMemoryRecord'
import { getFormattedDate } from '@utils/getFormattedDate'
import { IMemoryRecord } from 'types/myRecord'
import { ReactComponent as CalendarIcon } from '@assets/myRecordIcon/calendar.svg'
import { ReactComponent as ArrowDown } from '@assets/myRecordIcon/arrow_down.svg'

export default function CalendarRecord() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const { state } = useLocation()
  const {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    setDate,
  } = useMemoryRecord()

  useEffect(() => {
    if (state) {
      setIsOpenCalendar(false)
      setDate(
        getFormattedDate(
          new Date(`${state.year}-${state.month}-${state.day}`),
          'hyphen'
        )
      )
    }
  }, [state])

  if (isLoading) {
    return <></>
  }

  return (
    <>
      <section id="route-backIcon-button" className="ml-[18px] mt-4">
        <BackButton />
      </section>
      <section id="selected-date-record">
        <div className="mt-7 px-6">
          <h1 className="text-2xl font-semibold">마이 레코드</h1>
        </div>
        <div className="mt-6 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold leading-[18px]">
            {`${state.year}년 ${state.month}월 ${state.day}일의 추억 레코드`}
          </h2>
          <CalendarIcon
            className="cursor-pointer"
            onClick={() => setIsOpenCalendar(true)}
          />
        </div>
      </section>
      <section id="date-selected-result-records">
        {memoryRecord?.pages.map(({ data }) =>
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
        <div className="relative mb-[100px] h-[80px]">
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
      </section>
      {isOpenCalendar && <Calendar setIsOpenCalendar={setIsOpenCalendar} />}
    </>
  )
}
