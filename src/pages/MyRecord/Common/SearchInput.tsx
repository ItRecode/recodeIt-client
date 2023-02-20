import React, { Dispatch, SetStateAction, useRef } from 'react'
import { ReactComponent as SearchIcon } from '@assets/myRecordIcon/search.svg'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { RECORD_TITLE_MAX_LENGTH } from '@assets/constant/constant'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setKeyword: Dispatch<SetStateAction<string>>
  setIsClickedInput: Dispatch<SetStateAction<boolean>>
}

export default function SearchInput({
  onKeyUp,
  setKeyword,
  setIsClickedInput,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative flex w-full items-center">
      <SearchIcon className="absolute left-[12px] h-[14px] w-[14px]" />
      <input
        ref={inputRef}
        className="w-full rounded-[10px] bg-grey-2 py-[10px] pl-[38px] text-[14px] font-medium outline-none placeholder:text-grey-5"
        id="search-record-input"
        autoComplete="off"
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsClickedInput(true)}
        onBlur={() => setIsClickedInput(false)}
        onKeyUp={onKeyUp}
        maxLength={RECORD_TITLE_MAX_LENGTH}
        {...props}
      />
      <CloseIcon
        className="absolute right-[10px] cursor-pointer"
        onClick={() => {
          setKeyword('')
          inputRef.current?.focus()
        }}
      />
    </div>
  )
}
