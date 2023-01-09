import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

type userProps = {
  currentRecordType: string
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
}

function AddRecordTextArea({
  setCheckAllFilled,
  checkAllFilled,
  currentRecordType,
}: userProps) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [focusState, setFocusState] = useState<boolean>(false)
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 오늘은 나의 생일이에요!모두 축하해주세요!',
    consolation: 'ex) 오늘은 기분이 우울하네요. 저를 위로해주세요',
  }

  useEffect(() => {
    setTextAreaValue('')
  }, [currentRecordType])

  const handleChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_TEXTAREA_TYPING) {
      return setFocusState(false)
    }
    if (inputValueLength > 0) {
      setCheckAllFilled({ ...checkAllFilled, textArea: true })
    }
    if (inputValueLength === 0) {
      setCheckAllFilled({ ...checkAllFilled, textArea: false })
    }
    setTextAreaValue(e.target.value)
  }

  return (
    <div
      className={`mb-10 rounded-lg ${
        focusState ? 'bg-primary-10' : 'bg-grey-2'
      } px-4 pt-4 pb-2 text-sm font-medium text-grey-5`}
    >
      <textarea
        className={` min-h-[137px] ${
          focusState ? 'bg-primary-10' : 'bg-grey-2'
        } w-full resize-none  focus:outline-none focus:placeholder:text-transparent`}
        onChange={handleChangeTextArea}
        placeholder={
          currentRecordType === 'celebration'
            ? PLACEHOLDER_MESSAGE.celebration
            : PLACEHOLDER_MESSAGE.consolation
        }
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
        value={textAreaValue}
      />
      <div className="text-right text-xs">{`${textAreaValue.length}/${INPUT_DETAILS.MAX_TEXTAREA_TYPING}`}</div>
    </div>
  )
}

export default AddRecordTextArea
