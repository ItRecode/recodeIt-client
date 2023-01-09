import { getRecord } from '@apis/recordData'
import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import MoreButton from '@components/MoreButton'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IRecordDataType } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { Cake, Celebrate, Consolate, Happy, Love } from '@assets/chip_icon'
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

export default function DetailRecord() {
  const [shareStatus, setShareStatus] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [haveImage, setHaveImage] = useState(false)
  const [date, setDate] = useState('')
  // const [editModalState, setEditModalState] = useState(false)
  const [recordData, setRecordData] =
    useState<IRecordDataType>(INITIAL_RECORD_DATA)

  const {
    record_id,
    category_name,
    title,
    content,
    writer,
    color_name,
    icon_name,
    created_at,
    image_urls,
  } = recordData

  const { recordId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getRecordData = async () => {
      try {
        const response = await getRecord(recordId)
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
    if (image_urls[0]) {
      setHaveImage(true)
    }
    if (created_at) {
      setDate(getCreatedDate(created_at))
    }
  }, [recordData])

  const getChipIconName = () => {
    switch (category_name) {
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
      default:
        return ''
    }
  }

  const RecordIcon = recordIcons[`${icon_name}`]
  const background_color = `bg-${color_name}`

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
        <ShareModal
          setShareStatus={setShareStatus}
          recordId={record_id}
          title={title}
          description={content}
          background_color={background_color}
          icon_name={icon_name}
        />
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
              message={`${category_name}`}
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
          <div
            className={`${background_color} my-4 flex aspect-square w-full items-center justify-center rounded-2xl`}
          >
            {icon_name !== '' && <RecordIcon width={160} height={160} />}
          </div>
          <Button onClick={() => setShareStatus(true)}>
            <p className="text-base font-semibold">공유하기</p>
          </Button>
          <div className="my-6 w-[327px] text-[14px]">
            <p>{content}</p>
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
        <ReplyInput setInputSectionHeight={setInputSectionHeight} />
      </section>
    </div>
  )
}
