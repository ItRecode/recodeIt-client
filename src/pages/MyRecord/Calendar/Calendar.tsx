import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from '@assets/myRecordIcon/close.svg'
import { ReactComponent as ArrowDown } from '@assets/myRecordIcon/arrow_down.svg'
import { ReactComponent as ArrowUp } from '@assets/myRecordIcon/arrow_up.svg'
import useClickOutside from '@hooks/useClickOutside'
import Button from '@components/Button'
import DateBox from './DateBox'
import CalendarMonthYear from './CalendarMonthYear'
import { useMyRecordByMonthYear } from '@react-query/hooks/useMyRecordByMonthYear'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMonthYearDetail } from './getCalendarDetail'

interface CalendarProps {
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>
}

const WEEK_TO_KR = ['일', '월', '화', '수', '목', '금', '토']

export default function Calendar({ setIsOpenCalendar }: CalendarProps) {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { today, monthYear, setMonthYear, recordsWithMonthYear } =
    useMyRecordByMonthYear()
  const [isClickMonthYear, setIsClickMonthYear] = useState(false)
  const [selectedDate, setSelectedDate] = useState(0)
  const calendarRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpenCalendar(false)
  })
  const isTodayMonthYear =
    monthYear.month === today.month && monthYear.year === today.year
  const isFutureMonthYear =
    monthYear.month > today.month && monthYear.year === today.year

  useEffect(() => {
    if (state) {
      setIsClickMonthYear(false)
      setMonthYear(getMonthYearDetail(new Date(`${state.year}-${state.month}`)))
      setSelectedDate(state.day)
    }
  }, [])

  return (
    <div className="fixed top-0 z-30 block h-full w-full">
      <div className="absolute h-full w-screen max-w-[420px] bg-grey-10 opacity-50" />
      <div
        ref={calendarRef}
        className="fixed bottom-0 flex h-[478px] w-full max-w-[420px] animate-[popUp_150ms_linear] flex-col rounded-t-2xl bg-grey-1 px-[24px]"
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
          <div
            className="flex  cursor-pointer items-center pt-10"
            onClick={() => setIsClickMonthYear(!isClickMonthYear)}
          >
            <span className="mr-[10px] text-base font-medium">
              {monthYear.year}년 {monthYear.month}월
            </span>
            {isClickMonthYear ? <ArrowUp /> : <ArrowDown />}
          </div>
          {!isClickMonthYear && (
            <>
              <div className="mt-6 grid grid-cols-7 justify-items-center gap-2">
                {WEEK_TO_KR.map((day, i) => (
                  <p key={`${day}-${i}`} className="text-xs text-grey-6">
                    {day}
                  </p>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 justify-items-center gap-y-1 gap-x-2">
                <DateBox
                  date={1}
                  todayDate={isTodayMonthYear ? today.day : null}
                  gridColumnStart={monthYear.startDayOfMonth + 1}
                  hasRecord={recordsWithMonthYear?.includes(1)}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  isFutureMonthYear={isFutureMonthYear}
                />
                {[...Array(monthYear.lastDayOfMonth)].map((_, i) =>
                  i > 0 ? (
                    <DateBox
                      key={i}
                      date={i + 1}
                      todayDate={isTodayMonthYear ? today.day : null}
                      selectedDate={selectedDate}
                      hasRecord={recordsWithMonthYear?.includes(i + 1)}
                      setSelectedDate={setSelectedDate}
                      isFutureMonthYear={isFutureMonthYear}
                    />
                  ) : null
                )}
              </div>
              <div className="mt-8 w-full">
                <Button
                  aria-label="select-record-date-button"
                  property={'solid'}
                  active={selectedDate !== 0}
                  onClick={() =>
                    navigate('/myrecord/date', {
                      state: {
                        year: monthYear.year,
                        month: monthYear.month,
                        day: selectedDate,
                      },
                      replace: state ? true : false,
                    })
                  }
                >
                  선택
                </Button>
              </div>
            </>
          )}
          {isClickMonthYear && (
            <CalendarMonthYear
              month={monthYear.month}
              year={monthYear.year}
              setIsChangedMonthYear={setIsClickMonthYear}
              setMonthYear={setMonthYear}
              setSelectedDate={setSelectedDate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
