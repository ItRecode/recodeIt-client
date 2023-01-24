import React from 'react'
import { ReactComponent as Calendar } from '@assets/myRecordIcon/calendar.svg'

export default function MyRecordCalendar() {
  return (
    <div className="mt-7 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">마이 레코드</h1>
      <Calendar className="pointer" />
    </div>
  )
}
