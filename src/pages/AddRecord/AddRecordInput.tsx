import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

type userProps = {
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
}

function AddRecordInput({ setCheckAllFilled, checkAllFilled }: userProps) {
  const [inputValue, setInputValue] = useState('')
  const [inputFocus, setInputFocus] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_INPUT_TYPING) {
      return
    }
    if (inputValueLength > 0) {
      setCheckAllFilled({ ...checkAllFilled, input: true })
    }
    if (inputValueLength === 0) {
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
        className="border-none text-xs text-grey-9 outline-none placeholder:text-grey-4"
        placeholder="ex) 5월 5일 내생일"
        onChange={(e) => handleChange(e)}
        type="text"
        value={inputValue}
      />
      <span className="pb-2 text-xs">{`${inputValue.length}/${INPUT_DETAILS.MAX_INPUT_TYPING}`}</span>
    </div>
  )
}

export default AddRecordInput
