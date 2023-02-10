import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { ReactComponent as SearchIcon } from '@assets/myRecordIcon/search.svg'
import { ReactComponent as CalendarIcon } from '@assets/myRecordIcon/calendar.svg'
import { useMyRecord } from '@react-query/hooks/useMyRecord'
import TodayRecord from './TodayRecord'
import MemoryRecord from './MemoryRecord'
import Calendar from './Calendar'

export default function MyRecord() {
  const navigate = useNavigate()
  const { isLoading, monthYear } = useMyRecord()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [keyword, setKeyword] = useState('')

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/notservice')
    }
  }

  if (isLoading) {
    return <></>
  }

  return (
    <>
      <div className="h-full w-full">
        <section
          id="search-bar"
          className="sticky top-0 left-0 bg-grey-1 py-4 px-6"
        >
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-[12px] h-[14px] w-[14px]" />
            <input
              className="w-full rounded-[10px] bg-grey-2 py-[10px] pl-[38px] text-sm font-medium leading-[14px] outline-none placeholder:text-grey-5"
              id="search-record-input"
              placeholder="레코드 제목을 입력하세요"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyUp={handleSearch}
            />
            <CloseIcon className="absolute right-[10px] cursor-pointer" />
          </div>
        </section>
        <section id="my-today-record">
          <div className="mt-3 px-6">
            <h1 className="text-2xl font-semibold">마이 레코드</h1>
          </div>
        </section>
        <TodayRecord />
        <section id="my-memory-record">
          <div className="mt-3 flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold leading-[18px]">
              나만의 추억 레코드
            </h2>
            <CalendarIcon
              className="cursor-pointer"
              onClick={() => setIsOpenCalendar(true)}
            />
          </div>
          <MemoryRecord />
        </section>
      </div>
      {isOpenCalendar && (
        <Calendar monthYear={monthYear} setIsOpenCalendar={setIsOpenCalendar} />
      )}
    </>
  )
}
