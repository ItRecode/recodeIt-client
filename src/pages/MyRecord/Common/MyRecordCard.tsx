import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMyRecord } from 'types/myRecord'
import { getChipIconName } from '@pages/DetailRecord/getChipIconName'
import { getFormattedDate } from '@utils/getFormattedDate'
import Chip from '@components/Chip'
import recordIcons from '@assets/record_icons'

export default function MyRecordCard({
  recordId,
  title,
  categoryName,
  commentCount,
  iconName,
  colorName,
  createdAt,
}: IMyRecord) {
  const navigate = useNavigate()
  const background_color = `bg-${colorName}`
  const RecordIcon = recordIcons[`${iconName}`]

  return (
    <>
      <div
        className="cursor-pointer text-xs"
        onClick={() => navigate(`/record/${recordId}`)}
      >
        {getFormattedDate(new Date(createdAt), 'point')}
      </div>
      <div
        className="mt-4 flex w-fit cursor-pointer"
        onClick={() => navigate(`/record/${recordId}`)}
      >
        <div
          className={`${background_color} flex h-[86px] w-[86px] items-center rounded-2xl`}
        >
          <RecordIcon className="flex aspect-square w-full" />
        </div>
        <div className="ml-4 flex flex-col">
          <div className="inline">
            <Chip
              property="small"
              icon={getChipIconName(categoryName)}
              message={`${categoryName}`}
              active={true}
              pointer={false}
            />
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-[18px]">{title}</h2>
          <div className="mt-[14px] text-xs leading-4">
            댓글 {commentCount}개
          </div>
        </div>
      </div>
    </>
  )
}
