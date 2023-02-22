import React, { useState } from 'react'
import Calendar from './Calendar'
import BackButton from '@components/BackButton'
import { ReactComponent as CalendarIcon } from '@assets/myRecordIcon/calendar.svg'

export default function CalendarRecord() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

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
            2023년 2월 1일의 추억 레코드
          </h2>
          <CalendarIcon
            className="cursor-pointer"
            onClick={() => setIsOpenCalendar(true)}
          />
        </div>
      </section>
      {isOpenCalendar && <Calendar setIsOpenCalendar={setIsOpenCalendar} />}
    </>
  )
}
