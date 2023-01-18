import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { ReactComponent as SearchIcon } from '@assets/search.svg'
import TodayRecord from './TodayRecord'
import MemoryRecord from './MemoryRecord'

export default function MyRecord() {
  const navigate = useNavigate()

  return (
    <div className="h-full w-full px-6 pt-4">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-[12px] h-[14px] w-[14px]" />
        <input
          className="w-full rounded-[10px] bg-grey-2 py-[10px] pl-[38px] text-sm font-medium leading-[14px] placeholder:text-grey-5"
          id="search-record-input"
          type="search"
          placeholder="레코드 제목을 입력하세요"
          onClick={() => navigate('/notservice')}
        />
        <CloseIcon className="absolute right-[10px] cursor-pointer" />
      </div>
      <h1 className="mt-7 text-2xl font-semibold">마이 레코드</h1>
      <TodayRecord />
      <MemoryRecord />
    </div>
  )
}
