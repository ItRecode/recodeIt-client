import Button from '@components/Button'
import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as Pin } from '@assets/pin.svg'
import useClickOutside from '@hooks/useClickOutside'
import { useNavigate } from 'react-router-dom'
import { deleteRecord } from '@apis/record'
import { AxiosError } from 'axios'
import { LocalStorage } from '@utils/localStorage'

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
  const POST_ID = window.location.href.split('/')[4]
  const navigate = useNavigate()

  const handleClickDeleteButton = () => {
    DeleteRecordById(POST_ID)
  }
  const DeleteRecordById = async (id: string) => {
    try {
      await deleteRecord(id)
      setIsDelete(true)
      setEditModalState(false)
    } catch (error) {
      const { response } = error as unknown as AxiosError
      if (response?.status === 400) {
        alert('질못된 접근입니다.')
      }
      throw error
    }
  }

  const handleClickModifyButton = () => {
    LocalStorage.set('modifyMode', 'true')
    LocalStorage.set('postId', `${POST_ID}`)
    navigate('/record/add')
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
              onClick={handleClickModifyButton}
            >
              수정
            </Button>
          </div>
          <div className="w-full pt-2.5">
            <Button property="danger" onClick={handleClickDeleteButton}>
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
