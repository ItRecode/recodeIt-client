import { getRecord } from '@apis/recordData'
import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import MoreButton from '@components/MoreButton'
import ShareModal from '@components/ShareModal'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IRecordDataType } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { Cake, Celebrate, Consolate, Happy, Love } from '@assets/chip_icon'
import { INITIAL_RECORD_DATA } from '@assets/constant/constant'
import { getCreatedDate } from './getCreatedDate'

export default function DetailRecord() {
  const [shareStatus, setShareStatus] = useState(false)
  const [haveImage, setHaveImage] = useState(false)
  const [date, setDate] = useState('')
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
    // image_urls,
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
  return (
    <div className="w-full">
      {shareStatus && (
        <ShareModal
          setShareStatus={setShareStatus}
          recordId={record_id}
          title={title}
          description={content}
        />
      )}
      <header className="h-[60px]" />
      <nav className="flex justify-between px-6">
        <BackButton />
        <MoreButton />
      </nav>
      <section id="title" className="mt-7 flex flex-col px-6">
        <div className="flex justify-between">
          <p className="flex items-center text-2xl font-semibold">{title}</p>
          <Chip
            active={true}
            icon={getChipIconName()}
            message={`${category_name}`}
          />
        </div>
        <div className="mt-4 flex">
          <p className="text-[14px]">{writer}</p>
          <p className="px-4 text-xs text-grey-5">{date}</p>
        </div>
      </section>
      <section
        id="record_context"
        className="flex w-full flex-col items-center"
      >
        <div
          className={`my-4 h-[338px] w-[338px] rounded-2xl${color_name} flex items-center justify-center`}
        >
          {icon_name !== '' && <RecordIcon width={160} height={160} />}
        </div>
        <Button onClick={() => setShareStatus(true)}>공유하기</Button>
        <div className="my-6 w-[327px] text-[14px]">
          <p>{content}</p>
        </div>
      </section>
      <section id="reply" className="px-6">
        <p>댓글</p>
        <div className="mt-1.5">
          <div className="rounded-lg bg-grey-2 p-3">
            <div className="flex">
              <p className="text-xs font-medium">익명</p>
              <p className="mx-1.5 text-xs font-normal text-grey-5">0시간 전</p>
            </div>
            <p className="mt-1.5 text-xs font-normal text-grey-8">
              댓글이 노출됩니다.
            </p>
          </div>
          <div className="flex justify-end">
            <button className="cursor-pointer bg-grey-1 text-xs text-[#F83636]">
              신고
            </button>
            <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
              수정
            </button>
          </div>
        </div>
      </section>
      <footer />
    </div>
  )
}
