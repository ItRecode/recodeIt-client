import React, { Dispatch, SetStateAction } from 'react'
import recordIcons from '@assets/record_icons'
import { useLocation, useNavigate } from 'react-router-dom'

interface CardProps {
  title: string
  recordId: number
  colorName: string
  type: 'recentRecord' | 'mainRecord'
  iconName: string
  commentCount: number
  isDragging?: boolean
  setIsDragging?: Dispatch<SetStateAction<boolean>>
}

function RecordCard({
  recordId,
  title,
  type,
  colorName,
  iconName,
  commentCount,
  isDragging,
  setIsDragging,
}: CardProps) {
  const ColorName = `bg-${colorName}`
  const RecordIcon = recordIcons[`${iconName}`]
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClickRecord = (recordId: number) => {
    if (isDragging && setIsDragging) {
      setIsDragging(false)
      return
    }
    navigate(`/record/${recordId}`, { state: { previousUrl: pathname } })
  }
  return (
    <div
      key={recordId}
      className={`h-full ${
        type === 'recentRecord' ? 'w-[50%]' : 'w-[164px]'
      } shrink-0 rounded-2xl ${ColorName} flex cursor-pointer flex-col items-center justify-center`}
      onClick={() => handleClickRecord(recordId)}
    >
      <RecordIcon width={100} height={100} />
      <div className="mt-4 w-full text-sm font-semibold text-grey-10">
        <p className="w-full truncate px-5 text-center">{title}</p>
      </div>
      <p className="mt-2.5 text-xs leading-none">댓글 {commentCount}개</p>
    </div>
  )
}

export default RecordCard
