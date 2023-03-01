import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parentCategoryID } from 'types/category'
import { IRankingRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'

interface RankingItemType extends IRankingRecordData {
  index?: number
  parentCategoryId: parentCategoryID
}

export default function CommentSection({
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
    <div
      className="relative mb-5 flex h-12 w-full cursor-pointer items-center justify-between"
      onClick={() => navigate(`/record/${recordId}`)}
    >
      <div className="flex w-full items-center">
        <div
          className={`${colorName} flex aspect-square w-12 items-center justify-center rounded-full`}
        >
          <RecordIcon width={36} height={36} />
        </div>
        <div className={`ml-2 ${titleRelativeWidth} shrink`}>
          <p className="truncate text-base font-semibold">{title}</p>
          <div className="flex w-full text-xs">
            <p className="max-w-[85%] truncate text-grey-9">{writer}</p>
            <p className="ml-1.5 text-primary-2">+{numOfComment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
