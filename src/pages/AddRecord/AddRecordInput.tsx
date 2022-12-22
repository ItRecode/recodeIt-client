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

  const handleChange = (e: any) => {
    if (e.target.value.length > INPUT_DETAILS.MAX_INPUT_TYPING) return
    if (e.target.value.length > 0)
      setCheckAllFilled({ ...checkAllFilled, input: true })
    setInputLength(e.target.value)
  }

  return (
    <div className=" mb-10 flex justify-between border-b text-gray-400 border-gray-400">
      <input
        className=" pb-2 outline-none text-xs placeholder-gray-400 "
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
