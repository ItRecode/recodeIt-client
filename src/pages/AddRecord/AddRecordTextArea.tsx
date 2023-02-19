import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { CELEBRATION_ID, INPUT_DETAILS } from '@assets/constant/constant'
import { parentCategoryID } from 'types/category'

type userProps = {
  recordContent: string
  setRecordContent: Dispatch<SetStateAction<string>>
  currentRecordType: parentCategoryID
  setIsInputFocus: Dispatch<SetStateAction<boolean>>
  modifyTitle: string
}

function AddRecordTextArea({
  currentRecordType,
  setIsInputFocus,
  recordContent,
  setRecordContent,
  modifyTitle,
}: userProps) {
  const PLACEHOLDER_MESSAGE = {
    celebration: 'ex) 오늘은 나의 생일이에요! 모두 축하해주세요!',
    consolation: 'ex) 오늘은 기분이 우울하네요. 저를 위로해주세요',
  }

  useEffect(() => {
    setRecordContent(
      modifyTitle
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
    setRecordContent(e.target.value)
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
          currentRecordType === CELEBRATION_ID
            ? PLACEHOLDER_MESSAGE.celebration
            : PLACEHOLDER_MESSAGE.consolation
        }
        value={recordContent}
      />
      <div className="text-right text-xs">{`${recordContent.length}/${INPUT_DETAILS.MAX_TEXTAREA_TYPING}`}</div>
    </div>
  )
}

export default AddRecordTextArea
