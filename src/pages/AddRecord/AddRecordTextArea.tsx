import React, { useState } from 'react'
import { INPUT_DETAILS } from '../../assets/constant/constant'
import { CheckAllType, RecordType } from './AddRecord'

type userProps = {
  currentRecordType: RecordType
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
    if (e.target.value.length > INPUT_DETAILS.MAX_TEXTAREA_TYPING) return
    if (e.target.value.length > 0)
      setCheckAllFilled({ ...checkAllFilled, textArea: true })
    setTextAreaValue(e.target.value)
  }

  return (
    <div className=" mb-10 pl-4 pr-4 pt-4 pb-2 bg-gray-200 rounded-lg text-gray-500 font-medium text-sm">
      <textarea
        className=" resize-none  min-h-[137px] focus:outline-none w-full bg-gray-200"
        onChange={handleChangeTextArea}
        placeholder="ex) 오늘은 나의 생일이에요!모두 축하해주세요!"
      />
      <div className="text-right text-xs">{`${textAreaValue.length}/${INPUT_DETAILS.MAX_TEXTAREA_TYPING}`}</div>
    </div>
  )
}

export default AddRecordTextArea
