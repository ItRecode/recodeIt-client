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
  RECORD_DETAIL_HEADER_SECTION_HEIGHT,
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
} from '@assets/constant/constant'
import { getCreatedDate } from './getCreatedDate'
import ReplyList from './ReplyList'
import ReplyInput from './ReplyInput'
import ShareModal from './ShareModal'
import EditModal from './EditModal'
import { useRef } from 'react'
import ImageContainer from '@components/ImageContainer'
import Modal from '@components/Modal'
import { getRecord } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import Loading from '@components/Loading'
import { getChipIconName } from './getChipIconName'

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

  const background_color = `bg-${colorName}`

  const { recordIdParams } = useParams()

  const navigate = useNavigate()

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['getRecordData', recordIdParams],
    () => getRecord(recordIdParams)
  )
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
        {editModalState && <EditModal setEditModalState={setEditModalState} />}
        <header className="p-4">
          <nav className="flex justify-between">
            <BackButton />
            <button
              className="cursor-pointer bg-grey-1"
              onClick={() => setEditModalState(true)}
            >
              <MoreButton />
            </button>
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
            <div className="mt-6 mb-10 w-full px-1.5 text-[14px]">
              <p className="w-full ">{content}</p>
            </div>
          </section>
          <section id="record_reply_list">
            <ReplyList recordId={recordIdParams} />
          </section>
        </div>
        <section
          id="record_reply_input"
          className="absolute bottom-0 w-full border-t border-solid border-t-grey-2 bg-grey-1 px-6 py-4 "
        >
          <ReplyInput
            setInputSectionHeight={setInputSectionHeight}
            recordId={recordId}
          />
        </section>
      </div>
    </>
  )
}
