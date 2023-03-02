import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { ReactComponent as CalendarIcon } from '@assets/myRecordIcon/calendar.svg'
import TodayRecord from './TodayRecord'
import MemoryRecord from './MemoryRecord'
import SearchInput from './Common/SearchInput'
import Calendar from './Calendar/Calendar'
import { searchedKeyword } from '@store/myRecordAtom'
import useDebounce from '@hooks/useDebounce'

export default function MyRecord() {
  const navigate = useNavigate()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [isClickedInput, setIsClickedInput] = useState(false)
  const setSearchedKeyword = useSetRecoilState(searchedKeyword)

  useDebounce(
    () => {
      if (keyword.length > 0) {
        navigate('/myrecord/search')
        setSearchedKeyword({ keyword })
      }
    },
    500,
    [keyword]
  )

  return (
    <>
      <div className="h-full w-full">
        <section
          id="search-bar"
          className="sticky top-0 left-0 bg-grey-1 py-4 px-6"
        >
          <SearchInput
            value={keyword}
            setKeyword={setKeyword}
            setIsClickedInput={setIsClickedInput}
            placeholder={isClickedInput ? `` : `레코드 제목을 입력하세요`}
          />
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
      {isOpenCalendar && <Calendar setIsOpenCalendar={setIsOpenCalendar} />}
    </>
  )
}
