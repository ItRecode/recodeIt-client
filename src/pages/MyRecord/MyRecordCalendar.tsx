import React from 'react'
import { ReactComponent as Calendar } from '@assets/myRecordIcon/calendar.svg'
import { useNavigate } from 'react-router-dom'

export default function MyRecordCalendar() {
  const navigate = useNavigate()

  return (
    <div className="mt-3 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">마이 레코드</h1>
      <Calendar
        className="cursor-pointer"
        onClick={() => navigate('/notservice')}
      />
    </div>
  )
}
