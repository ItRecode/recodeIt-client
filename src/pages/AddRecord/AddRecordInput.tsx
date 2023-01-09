import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

interface Props {
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
  currentRecordType: string
}

function AddRecordInput({
  setCheckAllFilled,
  checkAllFilled,
  currentRecordType,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 5월 5일 내 생일',
    consolation: 'ex) 오늘 우울해요',
  }

  useEffect(() => {
    setInputValue('')
  }, [currentRecordType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_INPUT_TYPING) {
      return
    }
    if (inputValueLength > INPUT_DETAILS.MIN_TYPING) {
      setCheckAllFilled({ ...checkAllFilled, input: true })
    }
    if (inputValueLength === INPUT_DETAILS.MIN_TYPING) {
      setCheckAllFilled({ ...checkAllFilled, input: false })
    }
    setInputValue(e.target.value)
  }

  return (
    <div
      className={` mb-10 flex justify-between border-b transition-all duration-300 ${
        inputFocus ? 'border-primary-2' : 'border-grey-4'
      }`}
    >
      <input
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        className="border-none text-sm text-grey-9 outline-none placeholder:text-grey-4 focus:placeholder:text-transparent"
        placeholder={
          currentRecordType === 'celebration'
            ? PLACEHOLDER_MESSAGE.celebration
            : PLACEHOLDER_MESSAGE.consolation
        }
        onChange={(e) => handleChange(e)}
        type="text"
        value={inputValue}
      />
      <span className="pb-2 text-xs">{`${inputValue.length}/${INPUT_DETAILS.MAX_INPUT_TYPING}`}</span>
    </div>
  )
}

export default AddRecordInput
