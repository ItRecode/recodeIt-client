import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
interface DateBoxProps {
  date: number
  gridColumnStart?: number
  hasRecord?: boolean
  selectedDate: number
  setSelectedDate: Dispatch<SetStateAction<number>>
}

export default function DateBox({
  date,
  gridColumnStart,
  hasRecord,
  selectedDate,
  setSelectedDate,
}: DateBoxProps) {
  const [isClickedDay, setIsClickedDay] = useState(false)

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
        className={`flex h-full w-full items-center justify-center text-[16px] leading-4 ${
          hasRecord
            ? 'cursor-pointer font-bold text-primary-2'
            : 'font-medium  text-grey-7 '
        }`}
      >
        {date}
      </p>
    </div>
  )
}
