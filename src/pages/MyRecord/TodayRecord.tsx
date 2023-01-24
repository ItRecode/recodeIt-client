import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyRecord } from '@react-query/hooks/useMyRecord'
import { getChipIconName } from '@pages/DetailRecord/getChipIconName'
import Chip from '@components/Chip'
import recordIcons from '@assets/record_icons'

export default function TodayRecord() {
  const navigate = useNavigate()
  const { todayRecord, isLoading } = useMyRecord()
  const background_color = `bg-${todayRecord?.colorName}`
  const RecordIcon = recordIcons[`${todayRecord?.iconName}`]

  if (isLoading) {
    return <></>
  }

  if (!todayRecord) {
    return (
      <div className="mt-10 mb-[49px] w-full text-center">
        <span className="text-xs leading-5">
          오늘 쓴 레코드가 없어요!
          <br />
          레코드를 쓰고 추억을 공유해보세요.
        </span>
        <div
          className="mt-4 cursor-pointer text-sm font-semibold leading-5 text-primary-2 underline underline-offset-4"
          onClick={() => navigate('/record/add')}
        >
          레코드 추가하러 가기
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 mb-10 w-full px-6">
      {/* TODO: 레코드 만든 날짜 === 오늘 날짜 포맷팅하기*/}
      <div className="text-xs">{todayRecord.createdAt}</div>
      <div className="mt-4 flex">
        <div
          className={`${background_color} flex h-[86px] w-[86px] items-center rounded-2xl`}
        >
          <RecordIcon className="flex aspect-square w-full" />
        </div>
        <div className="ml-4 flex flex-col">
          <Chip
            property="small"
            icon={getChipIconName(todayRecord.categoryName)}
            message={`${todayRecord.categoryName}`}
            active={true}
            pointer={false}
          />
          <h2 className="mt-3 text-lg font-semibold leading-[18px]">
            {todayRecord.title}
          </h2>
          <div className="mt-[14px] text-xs leading-4">
            댓글 {todayRecord.commentCount}개
          </div>
        </div>
      </div>
    </div>
  )
}
