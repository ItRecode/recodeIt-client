import React, { Dispatch, SetStateAction } from 'react'
import { CategoryCard } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { useCheckMobile } from '@hooks/useCheckMobile'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  item: CategoryCard
  isDragging?: boolean
  setIsDragging?: Dispatch<SetStateAction<boolean>>
}

function Card({ item, isDragging, setIsDragging }: CardProps) {
  const { isMobile } = useCheckMobile()
  const colorName = `bg-${item.colorName}`
  const RecordIcon = recordIcons[`${item.iconName}`]
  const navigate = useNavigate()

  const handleClickRecord = (recordId: number) => {
    if (isDragging && setIsDragging) {
      setIsDragging(false)
      return
    }
    navigate(`/record/${recordId}`)
  }
  return (
    <div
      key={item.recordId}
      className={`h-full w-[164px] shrink-0 rounded-2xl ${colorName} flex cursor-pointer flex-col items-center justify-center`}
      onClick={() => handleClickRecord(item.recordId)}
    >
      <RecordIcon width={100} height={100} />
      <div className="mt-4 text-sm font-semibold text-grey-10">
        {!isMobile && item.title.length > 6 ? (
          <>
            <p>{item.title.substring(0, 6)}</p>
            <p className="text-center">
              {item.title.substring(6).replaceAll('(^\\p{Z}+|\\p{Z}+$)', '')}
            </p>
          </>
        ) : (
          item.title
        )}
      </div>
      <p className="mt-2.5 text-xs leading-none">댓글 {item.commentCount}개</p>
    </div>
  )
}

export default Card
