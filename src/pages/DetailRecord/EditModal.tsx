import Button from '@components/Button'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ReactComponent as Pin } from '@assets/pin.svg'
import useClickOutside from '@hooks/useClickOutside'
import { useNavigate } from 'react-router-dom'

export default function EditModal({
  setEditModalState,
  setIsDelete,
}: {
  setEditModalState: Dispatch<SetStateAction<boolean>>
  setIsDelete: Dispatch<SetStateAction<boolean>>
}) {
  const editRef = useClickOutside<HTMLDivElement>(() => {
    setEditModalState(false)
  })
  const navigate = useNavigate()

  const handleDeleteButton = () => {
    setIsDelete(true)
    setEditModalState(false)
  }

  return (
    <>
      <div
        ref={editRef}
        className={`absolute bottom-0 z-20 flex w-full animate-[popUp_150ms_linear] flex-col items-center justify-center rounded-t-lg bg-grey-1`}
      >
        <div className="pt-3.5">
          <Pin />
        </div>
        <div className="w-full px-2.5 pt-10">
          <div className="w-full">
            <Button
              property="danger"
              normal={true}
              onClick={() => navigate('/record/add')}
            >
              수정
            </Button>
          </div>
          <div className="w-full pt-2.5">
            <Button property="danger" onClick={handleDeleteButton}>
              삭제
            </Button>
          </div>
        </div>
        <div className="w-full px-2.5 pb-10 pt-5">
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
