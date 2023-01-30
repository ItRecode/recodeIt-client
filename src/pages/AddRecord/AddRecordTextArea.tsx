import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { INPUT_DETAILS } from '@assets/constant/constant'
import { CheckAllType } from './AddRecord'

type userProps = {
  recordContent: string
  currentRecordType: string
  setCheckAllFilled: Dispatch<SetStateAction<CheckAllType>>
  checkAllFilled: CheckAllType
  setIsInputFocus: Dispatch<SetStateAction<boolean>>
}

function AddRecordTextArea({
  setCheckAllFilled,
  checkAllFilled,
  currentRecordType,
  setIsInputFocus,
  recordContent,
}: userProps) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 오늘은 나의 생일이에요! 모두 축하해주세요!',
    consolation: 'ex) 오늘은 기분이 우울하네요. 저를 위로해주세요',
  }

  useEffect(() => {
    setTextAreaValue('')
    setTextAreaValue(
      recordContent
        ? recordContent.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n')
        : ''
    )
  }, [currentRecordType])

  const handleChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const inputValueLength = e.target.value.length
    if (inputValueLength > INPUT_DETAILS.MAX_TEXTAREA_TYPING) {
      return
    }
    if (inputValueLength > 0) {
      setCheckAllFilled({ ...checkAllFilled, textArea: e.target.value })
    }
    if (inputValueLength === 0) {
      setCheckAllFilled({ ...checkAllFilled, textArea: e.target.value })
    }
    setTextAreaValue(e.target.value)
  }

  return (
    <div
      className={`mb-10 rounded-lg bg-grey-2 px-4 pt-4 pb-2 text-sm font-medium text-grey-5`}
    >
      <textarea
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
        className={`min-h-[130px] w-full resize-none bg-grey-2  placeholder:text-grey-5 focus:outline-none focus:placeholder:text-transparent`}
        onChange={handleChangeTextArea}
        placeholder={
          currentRecordType === 'celebration'
            ? PLACEHOLDER_MESSAGE.celebration
            : PLACEHOLDER_MESSAGE.consolation
        }
        value={textAreaValue}
      />
      <div className="text-right text-xs">{`${textAreaValue?.length}/${INPUT_DETAILS.MAX_TEXTAREA_TYPING}`}</div>
    </div>
  )
}

export default AddRecordTextArea
