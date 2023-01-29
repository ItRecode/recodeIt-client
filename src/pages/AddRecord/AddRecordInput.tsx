import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

interface Props {
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
  currentRecordType: string
  setIsInputFocus: Dispatch<SetStateAction<boolean>>
  recordTitle: string | undefined
}

function AddRecordInput({
  setCheckAllFilled,
  checkAllFilled,
  currentRecordType,
  setIsInputFocus,
  recordTitle,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 5월 5일 내 생일',
    consolation: 'ex) 오늘 우울해요',
  }

  useEffect(() => {
    setInputValue('')
    setInputValue(recordTitle ? recordTitle : '')
  }, [currentRecordType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_INPUT_TYPING) {
      return
    }
    if (inputValueLength > INPUT_DETAILS.MIN_TYPING) {
      setCheckAllFilled({ ...checkAllFilled, input: e.target.value })
    }
    if (inputValueLength === INPUT_DETAILS.MIN_TYPING) {
      setCheckAllFilled({ ...checkAllFilled, input: e.target.value })
    }
    setInputValue(e.target.value)
  }

  const handleFocus = () => {
    setInputFocus(true)
    setIsInputFocus(true)
  }

  const handleBlur = () => {
    setInputFocus(false)
    setIsInputFocus(false)
  }

  return (
    <div
      className={`mb-10 flex items-end justify-between border-b pb-[2px] transition-all duration-300 ${
        inputFocus ? 'border-primary-2' : 'border-grey-4'
      }`}
    >
      <input
        disabled={recordTitle !== undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full border-none bg-grey-1 p-0 text-sm text-grey-9 outline-none placeholder:text-grey-4 focus:placeholder:text-transparent"
        placeholder={
          currentRecordType === 'celebration'
            ? PLACEHOLDER_MESSAGE.celebration
            : PLACEHOLDER_MESSAGE.consolation
        }
        onChange={(e) => handleChange(e)}
        type="text"
        value={inputValue}
      />
      <span className=" text-xs text-grey-4">{`${inputValue.length}/${INPUT_DETAILS.MAX_INPUT_TYPING}`}</span>
    </div>
  )
}

export default AddRecordInput
