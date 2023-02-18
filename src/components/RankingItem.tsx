import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parentCategoryID } from 'types/category'
import { IRankingRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { CELEBRATION_ID } from '@assets/constant/constant'
import { ReactComponent as Arrow } from '@assets/ranking_btn_arrow.svg'

interface RankingItemType extends IRankingRecordData {
  index: number
  parentCategoryId: parentCategoryID
}

export default function RankingItem({
  index,
  parentCategoryId,
  recordId,
  colorName,
  title,
  writer,
  numOfComment,
  iconName,
}: RankingItemType) {
  const navigate = useNavigate()
  const RecordIcon = recordIcons[`${iconName}`]

  const screenAvailWidth = window.screen.availWidth

  const titleRelativeWidth =
    screenAvailWidth > 370
      ? 'max-w-[45%]'
      : screenAvailWidth > 350
      ? 'max-w-[40%]'
      : 'max-w-[35%]'

  return (
    <div className="relative mb-5 flex h-12 w-full items-center justify-between px-6">
      <div className="flex w-full items-center">
        <p>{index}</p>
        <div
          className={`${colorName} ml-4 flex aspect-square w-12 items-center justify-center rounded-full`}
        >
          <RecordIcon width={36} height={36} />
        </div>
        <div className={`ml-2 ${titleRelativeWidth}`}>
          <p className="truncate text-base font-semibold">{title}</p>
          <div className="flex whitespace-nowrap text-xs">
            <p className="text-grey-9">{writer}</p>
            <p className="ml-1.5 text-primary-2">+{numOfComment}</p>
          </div>
        </div>
      </div>

      <button
        className="absolute right-6 flex cursor-pointer items-center whitespace-nowrap bg-transparent p-0"
        onClick={() => navigate(`/record/${recordId}`)}
      >
        <p>함께 {parentCategoryId === CELEBRATION_ID ? '축하' : '위로'}하기</p>
        <Arrow className="ml-4" />
      </button>
    </div>
  )
}
