import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import MoreButton from '@components/MoreButton'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IRecordDataType } from 'types/recordData'
import {
  INITIAL_RECORD_DATA,
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
} from '@assets/constant/constant'
import { getCreatedDate } from './getCreatedDate'
import ReplyList from './ReplyList'
import ReplyInput from './ReplyInput'
import ShareModal from './ShareModal'
import EditModal from './EditModal'
import { useRef } from 'react'
import Modal from '@components/Modal'
import { deleteRecord, getRecord } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import Loading from '@components/Loading'
import { getChipIconName } from './getChipIconName'
import ImageContainer from './ImageContainer'
import { useUser } from '@react-query/hooks/useUser'
import Alert from '@components/Alert'
import { DetailPageInputMode } from '@store/atom'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { AxiosError } from 'axios'

export default function DetailRecord() {
  const [shareStatus, setShareStatus] = useState(false)
  const [editModalState, setEditModalState] = useState(false)

  const [date, setDate] = useState('')
  const [recordData, setRecordData] =
    useState<IRecordDataType>(INITIAL_RECORD_DATA)

  const {
    recordId,
    categoryName,
    title,
    content,
    writer,
    colorName,
    iconName,
    createdAt,
    imageUrls,
  } = recordData
  const { user } = useUser()

  const background_color = `bg-${colorName}`

  const { recordIdParams } = useParams()

  const navigate = useNavigate()

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['getRecordData', recordIdParams],
    () => getRecord(recordIdParams),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
  const POST_ID = window.location.href.split('/')[4]
  const [isDelete, setIsDelete] = useState(false)
  useEffect(() => {
    if (isError) {
      alert('해당 레코드를 찾을 수 없습니다.')
      navigate('/notFound')
    }
    if (isSuccess) {
      setRecordData(data)
    }
  }, [data, isError])

  useEffect(() => {
    if (createdAt) {
      setDate(getCreatedDate(createdAt))
    }
  }, [recordData])

  const scrollSectionFragments = useRef<HTMLDivElement>(null)
  const [inputSectionHeight, setInputSectionHeight] = useState(
    RECORD_DETAIL_INITIAL_INPUT_HEIGHT
  )

  useEffect(() => {
    if (scrollSectionFragments.current !== null) {
      scrollSectionFragments.current.style.height = 'auto'
      scrollSectionFragments.current.style.height = inputSectionHeight + 'px'
    }
  }, [inputSectionHeight])

  const checkUserHistoryLength = () => {
    if (window.history.length === 1 || window.history.state === null) {
      return navigate('/myrecord')
    }
    navigate(-1)
  }

  const deleteRecordById = async (id: string) => {
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

  return (
    <>
      {isLoading && <Loading />}
      <div className="relative h-screen w-full">
        {shareStatus && (
          <Modal visible={shareStatus} onClose={() => setShareStatus(false)}>
            <ShareModal
              setShareStatus={setShareStatus}
              recordId={recordId}
              title={title}
              description={content}
              backgroundColor={background_color}
              iconName={iconName}
            />
          </Modal>
        )}
        {editModalState && (
          <EditModal
            POST_ID={POST_ID}
            setIsDelete={setIsDelete}
            setEditModalState={setEditModalState}
          />
        )}
        {isDelete && (
          <Alert
            mainMessage={
              <div className="text-base font-semibold leading-6">
                정말로 이 레코드를
                <br />
                <span className="text-sub-1">삭제</span>하시겠어요?
              </div>
            }
            subMessage={<>삭제 후 복구는 불가능해요.</>}
            visible={isDelete}
            cancelMessage="취소"
            confirmMessage="삭제"
            danger={true}
            onClose={() => setIsDelete(false)}
            onCancel={() => setIsDelete(false)}
            onConfirm={() => {
              checkUserHistoryLength()
              deleteRecordById(POST_ID)
            }}
          />
        )}
        <header className="p-4">
          <nav className="flex justify-between">
            <BackButton />
            {user?.data === writer && (
              <button
                className="cursor-pointer bg-transparent"
                onClick={() => setEditModalState(true)}
              >
                <MoreButton />
              </button>
            )}
          </nav>
        </header>
        <div className="overflow-y-auto">
          <section id="title" className="flex flex-col px-6">
            <div className="flex justify-between whitespace-nowrap">
              <p className="flex items-center whitespace-nowrap text-2xl font-semibold leading-none">
                {title}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex">
                <p className="flex items-center text-[14px]">{writer}</p>
                <p className="px-2 text-xs text-grey-5">{date}</p>
              </div>
              <Chip
                active={true}
                icon={getChipIconName(categoryName)}
                message={`${categoryName}`}
                property="small"
              />
            </div>
          </section>
          <section
            id="record_context"
            className="flex w-full flex-col items-center px-[18px]"
          >
            <ImageContainer
              background_color={background_color}
              iconName={iconName}
              imageUrls={imageUrls}
            />
            <Button onClick={() => setShareStatus(true)}>
              <p className="text-base font-semibold">공유하기</p>
            </Button>
            <div className="mt-6 mb-10 w-full px-1.5 text-[14px] leading-normal">
              <p className="w-full">{content}</p>
            </div>
          </section>
          <section id="record_reply_list">
            <ReplyList recordId={recordIdParams} Recordwriter={writer} />
          </section>
          <div ref={scrollSectionFragments} />
        </div>
        <section
          id="record_reply_input"
          className="fixed bottom-0 w-full max-w-[420px] border-t border-solid border-t-grey-2 bg-grey-1"
        >
          <ReplyInput
            setInputSectionHeight={setInputSectionHeight}
            recordIdParams={recordIdParams}
          />
        </section>
      </div>
    </>
  )
}
