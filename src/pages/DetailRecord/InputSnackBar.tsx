import { DetailPageInputMode } from '@store/atom'
import React, { Dispatch, SetStateAction } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { ReactComponent as CloseIcon } from '@assets/detail_page_icon/Close.svg'

interface Iprops {
  setText: Dispatch<SetStateAction<string>>
  setImage: Dispatch<SetStateAction<string>>
  setImageFile: Dispatch<SetStateAction<File | null>>
}

export default function InputSnackBar({
  setText,
  setImage,
  setImageFile,
}: Iprops) {
  const inputMode = useRecoilValue(DetailPageInputMode)
  const resetInputMode = useResetRecoilState(DetailPageInputMode)
  return (
    <>
      {(inputMode.mode === 'nestedReply' || inputMode.mode === 'update') && (
        <div className="flex h-[48px] w-full items-center justify-between bg-grey-2 py-2 px-4">
          <p className="text-xs text-grey-6">
            {inputMode.mode === 'nestedReply' ? '답글 작성중...' : '수정중...'}
          </p>
          <button
            onClick={() => {
              resetInputMode()
              setText('')
              setImage('')
              setImageFile(null)
            }}
            className="cursor-pointer p-0"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  )
}
