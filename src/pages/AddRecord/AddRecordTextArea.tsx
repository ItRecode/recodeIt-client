import React, { useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

type userProps = {
  currentRecordType: string
  setCheckAllFilled: (value: any) => void
  checkAllFilled: CheckAllType
}

function AddRecordTextArea({
  currentRecordType,
  setCheckAllFilled,
  checkAllFilled,
}: userProps) {
  const [textAreaValue, setTextAreaValue] = useState('')

  const handleChangeTextArea = (e: any): void => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_TEXTAREA_TYPING) {
      return
    }
    if (inputValueLength > 0) {
      setCheckAllFilled({ ...checkAllFilled, textArea: true })
    }
    setTextAreaValue(e.target.value)
  }

  return (
    <div className=" mb-10 rounded-lg bg-gray-200 px-4 pt-4 pb-2 text-sm font-medium text-gray-500">
      <textarea
        className=" min-h-[137px]  w-full resize-none bg-gray-200 focus:outline-none"
        onChange={handleChangeTextArea}
        placeholder="ex) 오늘은 나의 생일이에요!모두 축하해주세요!"
      />
      <div className="text-right text-xs">{`${textAreaValue.length}/${INPUT_DETAILS.MAX_TEXTAREA_TYPING}`}</div>
    </div>
  )
}

export default AddRecordTextArea
