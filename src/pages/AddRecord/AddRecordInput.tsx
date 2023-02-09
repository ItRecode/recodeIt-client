import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CELEBRATION_ID, INPUT_DETAILS } from '@assets/constant/constant'
import { IsInputsHasValueType } from './AddRecord'
import { parentCategoryID } from 'types/category'

interface Props {
  setIsInputsHasValue: Dispatch<SetStateAction<IsInputsHasValueType>>
  isInputsHasValue: IsInputsHasValueType
  setIsInputFocus: Dispatch<SetStateAction<boolean>>
  recordTitle: string
  setRecordTitle: Dispatch<SetStateAction<string>>
  parentCategoryId: parentCategoryID
  isModify?: boolean
}

function AddRecordInput({
  setIsInputsHasValue,
  isInputsHasValue,
  setIsInputFocus,
  recordTitle,
  setRecordTitle,
  parentCategoryId,
  isModify,
}: Props) {
  const [isFocus, setIsFocus] = useState(false)
  const PLACEHOLDER_MESSAGE =
    parentCategoryId === CELEBRATION_ID
      ? 'ex) 5월 5일 내 생일'
      : 'ex) 오늘 우울해요'

  useEffect(() => {
    setRecordTitle('')
  }, [parentCategoryId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (recordTitle.length > INPUT_DETAILS.MAX_INPUT_TYPING) {
      return
    }
    if (recordTitle.length > INPUT_DETAILS.MIN_TYPING) {
      setIsInputsHasValue({ ...isInputsHasValue, input: true })
    }
    if (recordTitle.length === INPUT_DETAILS.MIN_TYPING) {
      setIsInputsHasValue({ ...isInputsHasValue, input: false })
    }
    setRecordTitle(e.target.value)
  }

  const handleFocus = () => {
    setIsInputFocus(true)
    setIsFocus(true)
  }
  const handleBlur = () => {
    setIsInputFocus(false)
    setIsFocus(false)
  }

  return (
    <div
      className={`mb-10 flex items-end justify-between border-b pb-[2px] transition-all duration-300 ${
        isFocus ? 'border-primary-2' : 'border-grey-4'
      }`}
    >
      <input
        disabled={isModify}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full border-none bg-grey-1 p-0 text-sm text-grey-9 outline-none placeholder:text-grey-4 focus:placeholder:text-transparent"
        placeholder={PLACEHOLDER_MESSAGE}
        onChange={(e) => handleChange(e)}
        type="text"
        value={recordTitle}
      />
      <span className=" text-xs text-grey-4">{`${recordTitle.length}/${INPUT_DETAILS.MAX_INPUT_TYPING}`}</span>
    </div>
  )
}

export default AddRecordInput
