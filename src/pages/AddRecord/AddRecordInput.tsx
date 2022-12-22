import React, { useState } from 'react'
import { INPUT_DETAILS } from '../../assets/constant/constant'
import { CheckAllType, RecordType } from './AddRecord'

type userProps = {
  currentRecordType: RecordType
  setCheckAllFilled: (value: any) => void
  checkAllFilled: CheckAllType
}

function AddRecordInput({
  currentRecordType,
  setCheckAllFilled,
  checkAllFilled,
}: userProps) {
  const [inputLength, setInputLength] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  console.log(inputFocus)

  const handleChange = (e: any) => {
    if (e.target.value.length > INPUT_DETAILS.MAX_INPUT_TYPING) return
    if (e.target.value.length > 0)
      setCheckAllFilled({ ...checkAllFilled, input: true })
    setInputLength(e.target.value)
  }

  // const

  return (
    <div
      className={` mb-10 flex justify-between border-b transition-all duration-300   ${
        inputFocus ? 'border-primary-2' : 'border-gray-400'
      }`}
    >
      <input
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        className=" pb-2 text-gray-900 outline-none text-xs placeholder-gray-400"
        placeholder="ex) 5월 5일 내생일"
        onChange={(e) => handleChange(e)}
        type="text"
        value={inputLength}
      />
      <span className="pb-2 text-xs">{`${inputLength.length}/${INPUT_DETAILS.MAX_INPUT_TYPING}`}</span>
    </div>
  )
}

export default AddRecordInput
