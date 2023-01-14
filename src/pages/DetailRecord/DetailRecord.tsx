import { getRecord } from '@apis/recordData'
import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import MoreButton from '@components/MoreButton'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IRecordDataType } from 'types/recordData'
import {
  Cake,
  Celebrate,
  Consolate,
  Depress,
  Happy,
  Love,
  MySide,
  Sympathy,
} from '@assets/chip_icon'
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

export default function DetailRecord() {
  const [shareStatus, setShareStatus] = useState(false)
  const [date, setDate] = useState('')
  const [editModalState, setEditModalState] = useState(false)
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

  const { recordIdParams } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getRecordData = async () => {
      try {
        const response = await getRecord(recordIdParams)
        if (response) {
          setRecordData(response.data)
        }
      } catch (e) {
        alert('해당 레코드를 찾을 수 없습니다.')
        navigate('/notFound')
      }
    }
    getRecordData()
  }, [])

  useEffect(() => {
    if (createdAt) {
      setDate(getCreatedDate(createdAt))
    }
  }, [recordData])

  const getChipIconName = () => {
    switch (categoryName) {
      case '축하해주세요':
        return Celebrate
      case '행복해요':
        return Happy
      case '기념일이에요':
        return Cake
      case '연애중이에요':
        return Love
      case '위로해주세요':
        return Consolate
      case '우울해요':
        return Depress
      case '공감이 필요해요':
        return Sympathy
      case '내 편이 되어주세요':
        return MySide
      default:
        return ''
    }
  }

  const background_color = `bg-${colorName}`

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
            <p className="flex items-center text-2xl font-semibold">{title}</p>
            <Chip
              active={true}
              icon={getChipIconName()}
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
          <ReplyList />
        </section>
      </div>
      <section
        id="record_reply_input"
        className="absolute bottom-0 w-full bg-grey-1 px-6 py-4"
      >
        <ReplyInput
          setInputSectionHeight={setInputSectionHeight}
          recordId={recordId}
        />
      </section>
    </div>
  )
}
