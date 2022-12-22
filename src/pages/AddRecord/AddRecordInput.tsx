import React, { Dispatch, SetStateAction, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

type userProps = {
  currentRecordType: string
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
}

function AddRecordInput({
  currentRecordType,
  setCheckAllFilled,
  checkAllFilled,
}: userProps) {
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
    setInputValue(e.target.value)
  }

  return (
    <div
      className={` mb-10 flex justify-between border-b transition-all duration-300   ${
        inputFocus ? 'border-primary-2' : 'border-gray-400'
      }`}
    >
      <input
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        className=" pb-2 text-xs text-gray-900 outline-none placeholder:text-gray-400"
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
