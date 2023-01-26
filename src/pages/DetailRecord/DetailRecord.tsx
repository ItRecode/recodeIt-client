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
  INPUT_MODE,
  RECORD_DETAIL_HEADER_SECTION_HEIGHT,
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
} from '@assets/constant/constant'
import { getCreatedDate } from './getCreatedDate'
import ReplyList from './ReplyList'
import ReplyInput from './ReplyInput'
import ShareModal from './ShareModal'
import EditModal from './EditModal'
import { useRef } from 'react'
import Modal from '@components/Modal'
import { getRecord } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import Loading from '@components/Loading'
import { getChipIconName } from './getChipIconName'
import ImageContainer from './ImageContainer'
import { useUser } from '@react-query/hooks/useUser'
import Alert from '@components/Alert'
import { DetailPageInputMode } from '@store/atom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { ReactComponent as CloseIcon } from '@assets/detail_page_icon/Close.svg'

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
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
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

  const scrollSection = useRef<HTMLDivElement>(null)
  const [inputSectionHeight, setInputSectionHeight] = useState(
    RECORD_DETAIL_INITIAL_INPUT_HEIGHT
  )

  useEffect(() => {
    if (scrollSection.current !== null) {
      scrollSection.current.style.height = 'auto'
      scrollSection.current.style.height =
        window.innerHeight -
        inputSectionHeight -
        RECORD_DETAIL_HEADER_SECTION_HEIGHT +
        'px'
    }
  }, [inputSectionHeight])

  const checkUserHistoryLength = () => {
    if (window.history.length === 1 || window.history.state === null) {
      return navigate('/myrecord')
    }
    navigate(-1)
  }

  const inputMode = useRecoilValue(DetailPageInputMode)
  const resetInputMode = useResetRecoilState(DetailPageInputMode)

  return (
    <>
      {isLoading && <Loading />}
      <div className="relative h-full w-full">
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
            setIsDelete={setIsDelete}
            setEditModalState={setEditModalState}
          />
        )}
        {isDelete && (
          <Alert
            mainMessage={
              <div className="text-base font-semibold leading-6">
                레코드를
                <br />
                삭제하시겠어요?
              </div>
            }
            visible={isDelete}
            cancelMessage="아니오"
            confirmMessage="삭제"
            onClose={() => setIsDelete(false)}
            onCancel={() => setIsDelete(false)}
            onConfirm={() => checkUserHistoryLength()}
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
        <div className="mb-3 overflow-auto" ref={scrollSection}>
          <section id="title" className="flex flex-col px-6">
            <div className="flex justify-between">
              <p className="flex items-center text-2xl font-semibold">
                {title}
              </p>
              <Chip
                active={true}
                icon={getChipIconName(categoryName)}
                message={`${categoryName}`}
                property="small"
              />
            </div>
            <div className="mt-4 flex">
              <p className="text-[14px]">{writer}</p>
              <p className="px-4 text-xs text-grey-5">{date}</p>
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
        </div>

        <section
          id="record_reply_input"
          className="sticky bottom-0 w-full border-t border-solid border-t-grey-2 bg-grey-1"
        >
          {inputMode.mode === INPUT_MODE.NESTEDREPLY && (
            <div className="flex h-[48px] w-full items-center justify-between bg-grey-2 py-2 px-4">
              <p className="text-xs text-grey-6">답글 작성중...</p>
              <button onClick={resetInputMode} className="cursor-pointer p-0">
                <CloseIcon />
              </button>
            </div>
          )}

          <ReplyInput
            setInputSectionHeight={setInputSectionHeight}
            recordIdParams={recordIdParams}
          />
        </section>
      </div>
    </>
  )
}
