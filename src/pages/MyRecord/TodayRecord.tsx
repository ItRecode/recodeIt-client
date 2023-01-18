import React, { useEffect, useState } from 'react'

import { IRecordTodayData } from 'types/recordData'
import { getChipIconName } from '@pages/DetailRecord/getChipIconName'
import Chip from '@components/Chip'
import recordIcons from '@assets/record_icons'

export default function TodayRecord() {
  const [todayWriteRecord, setTodayWriteRecord] =
    useState<IRecordTodayData | null>(null)
  const background_color = `bg-${todayWriteRecord?.colorName}`
  const RecordIcon = recordIcons[`${todayWriteRecord?.iconName}`]

  useEffect(() => {
    setTodayWriteRecord({
      createdAt: '2023-01-18T19:42:07.611079',
      categoryName: '축하해주세요',
      title: '제목제목제목',
      commentCount: 3,
      iconName: 'moon',
      colorName: 'icon-pink',
    })
  })

  if (!todayWriteRecord) {
    return <div />
  }

  return (
    <div className="mt-4">
      {/* TODO: 레코드 만든 날짜 === 오늘 날짜*/}
      <div className="text-xs">{todayWriteRecord.createdAt}</div>
      <div className="mt-4 flex">
        <div
          className={`${background_color} flex h-[86px] w-[86px]  items-center rounded-2xl`}
        >
          <RecordIcon className="flex aspect-square w-full" />
        </div>
        <div className="ml-4 flex flex-col">
          <Chip
            property="small"
            icon={getChipIconName(todayWriteRecord.categoryName)}
            message={`${todayWriteRecord.categoryName}`}
            active={true}
            pointer={false}
          />
          <h2 className="mt-3 text-lg font-semibold leading-[18px]">
            {todayWriteRecord.title}
          </h2>
          <div className="mt-[14px] text-xs leading-4">
            댓글 {todayWriteRecord.commentCount}개
          </div>
        </div>
      </div>
    </div>
  )
}
