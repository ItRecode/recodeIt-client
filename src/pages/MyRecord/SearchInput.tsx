import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as SearchIcon } from '@assets/myRecordIcon/search.svg'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setKeyword: Dispatch<SetStateAction<string>>
}

export default function SearchInput({
  value,
  onKeyUp,
  setKeyword,
}: SearchInputProps) {
  return (
    <div className="relative flex w-full items-center">
      <SearchIcon className="absolute left-[12px] h-[14px] w-[14px]" />
      <input
        className="w-full rounded-[10px] bg-grey-2 py-[10px] pl-[38px] text-[14px] font-medium outline-none placeholder:text-grey-5"
        id="search-record-input"
        value={value}
        placeholder="레코드 제목을 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUp}
      />
      <CloseIcon className="absolute right-[10px] cursor-pointer" />
    </div>
  )
}
