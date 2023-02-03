import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { IsInputsHasValueType } from './AddRecord'
import { useRecoilValue } from 'recoil'
import { recordTypeAtom } from '@store/atom'

interface Props {
  setIsInputsHasValue: Dispatch<SetStateAction<IsInputsHasValueType>>
  isInputsHasValue: IsInputsHasValueType
  setIsInputFocus: Dispatch<SetStateAction<boolean>>
  recordTitle: string | undefined
  isInputFocus: boolean
}

function AddRecordInput({
  setIsInputsHasValue,
  isInputsHasValue,
  setIsInputFocus,
  recordTitle,
  isInputFocus,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 5월 5일 내 생일',
    consolation: 'ex) 오늘 우울해요',
  }
  const currentRecordType = useRecoilValue(recordTypeAtom)

  useEffect(() => {
    setInputValue('')
    if (recordTitle) {
      setInputValue(recordTitle)
    }
  }, [currentRecordType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_INPUT_TYPING) {
      return
    }
    if (inputValueLength > INPUT_DETAILS.MIN_TYPING) {
      setIsInputsHasValue({ ...isInputsHasValue, input: true })
    }
    if (inputValueLength === INPUT_DETAILS.MIN_TYPING) {
      setIsInputsHasValue({ ...isInputsHasValue, input: false })
    }
    setInputValue(e.target.value)
  }

  return (
    <div
      className={`mb-10 flex items-end justify-between border-b pb-[2px] transition-all duration-300 ${
        isInputFocus ? 'border-primary-2' : 'border-grey-4'
      }`}
    >
      <input
        disabled={recordTitle !== undefined}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
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
