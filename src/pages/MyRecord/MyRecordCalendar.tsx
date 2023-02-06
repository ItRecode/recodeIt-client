import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as Calendar } from '@assets/myRecordIcon/calendar.svg'

interface MyRecordCalendarProps {
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>
}

export default function MyRecordCalendar({
  setIsOpenCalendar,
}: MyRecordCalendarProps) {
  return (
    <div className="mt-3 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">마이 레코드</h1>
      <Calendar
        className="cursor-pointer"
        onClick={() => setIsOpenCalendar(true)}
      />
    </div>
  )
}
