import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as CloseIcon } from '@assets/myRecordIcon/close.svg'
import useClickOutside from '@hooks/useClickOutside'
import DateBox from './DateBox'
import { MonthYear } from './getCalendarDetail'
import Button from '@components/Button'

interface CalendarProps {
  monthYear: MonthYear
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>
}

const WEEK_TO_KR = ['일', '월', '화', '수', '목', '금', '토']

export default function Calendar({
  setIsOpenCalendar,
  monthYear,
}: CalendarProps) {
  const calendarRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpenCalendar(false)
  })

  return (
    <div className="fixed top-0 z-20 block h-full w-full ">
      <div className="absolute h-full w-screen max-w-[420px] bg-grey-10 opacity-50" />
      <div
        ref={calendarRef}
        className="fixed bottom-0 z-20 flex h-[478px] w-full max-w-[420px] animate-[popUp_150ms_linear] flex-col rounded-t-2xl bg-grey-1 px-[24px]"
      >
        <div className="flex flex-col pt-8">
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-semibold">
              어떤 날의 추억을 찾으시나요?
            </p>
            <CloseIcon
              className="h-[13px] w-[13px] cursor-pointer"
              onClick={() => setIsOpenCalendar(false)}
            />
          </div>
          <div className="pt-10">
            {monthYear.year}년 {monthYear.month + 1}월
          </div>
          <div className="mt-6 grid grid-cols-7 justify-items-center gap-2">
            {WEEK_TO_KR.map((day, i) => (
              <p key={`${day}-${i}`} className="text-xs text-grey-6">
                {day}
              </p>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 justify-items-center gap-2">
            <DateBox date={1} gridColumnStart={monthYear.startDayOfMonth + 1} />
            {[...Array(monthYear.lastDayOfMonth)].map((_, i) =>
              i > 0 ? <DateBox key={i} date={i + 1} /> : null
            )}
          </div>
          <div className="mt-8 w-full">
            <Button
              aria-label="select-record-date-button"
              property={'solid'}
              active={false}
            >
              선택
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
