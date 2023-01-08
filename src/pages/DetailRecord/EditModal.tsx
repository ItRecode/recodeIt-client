import Button from '@components/Button'
import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as Pin } from '@assets/pin.svg'

export default function EditModal({
  setEditModalState,
}: {
  setEditModalState: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <div className="absolute bottom-0 z-20 flex w-full animate-[popUp_150ms_linear] flex-col items-center justify-center rounded-t-lg bg-grey-1">
        <div className="pt-3.5">
          <Pin />
        </div>
        <div className="pt-10">
          <div>
            <Button property="danger" normal={true}>
              수정
            </Button>
          </div>
          <div className="pt-2.5">
            <Button
              property="danger"
              onClick={() => alert('레코드를 삭제하시겠어요?')}
            >
              삭제
            </Button>
          </div>
        </div>
        <div className="pb-10 pt-5">
          <Button onClick={() => setEditModalState(false)} property="solid">
            취소
          </Button>
        </div>
      </div>
      <div className="fixed left-0 z-10 flex h-full w-screen items-end justify-center">
        <div className="absolute flex h-full w-screen bg-grey-10 opacity-50" />
      </div>
    </>
  )
}
