import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface DateBoxProps {
  date: number
  todayDate: number | null
  gridColumnStart?: number
  hasRecord?: boolean
  selectedDate: number
  setSelectedDate: Dispatch<SetStateAction<number>>
}

export default function DateBox({
  date,
  todayDate,
  gridColumnStart,
  hasRecord,
  selectedDate,
  setSelectedDate,
}: DateBoxProps) {
  const [isClickedDay, setIsClickedDay] = useState(false)
  const [disabledDay, setDisabledDay] = useState(false)

  useEffect(() => {
    if (todayDate && date > todayDate) {
      setDisabledDay(true)
    }
  }, [])

  useEffect(() => {
    if (selectedDate === date) {
      setIsClickedDay(true)
    } else {
      setIsClickedDay(false)
    }
  }, [selectedDate])

  const handleSelectedDay = () => {
    if (!isClickedDay && hasRecord) {
      setSelectedDate(date)
      setIsClickedDay(!isClickedDay)
    }
    if (isClickedDay && hasRecord) {
      setSelectedDate(0)
    }
  }

  return (
    <div
      style={{ gridColumnStart }}
      className={`h-[36px] w-[36px] ${
        isClickedDay && hasRecord
          ? 'rounded-full bg-primary-8 text-primary-1'
          : ''
      }
    `}
      onClick={handleSelectedDay}
    >
      <p
        className={`flex h-full w-full items-center justify-center text-[16px] font-medium leading-4 ${
          hasRecord
            ? 'cursor-pointer font-bold text-primary-2'
            : disabledDay
            ? 'text-grey-3'
            : 'text-grey-7 '
        }`}
      >
        {date}
      </p>
    </div>
  )
}
