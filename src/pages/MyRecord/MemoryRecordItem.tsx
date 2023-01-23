import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMemoryRecord } from 'types/recordData'

import useSwipe from '@hooks/useSwipe'
import recordIcons from '@assets/record_icons'
import { ReactComponent as PlusIcons } from '@assets/myRecordIcon/comment_plus.svg'

export default function MemoryRecordItem({
  recordId,
  title,
  iconName,
  iconColor,
  memoryRecordComments,
}: IMemoryRecord) {
  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>
  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)
  const navigate = useNavigate()
  const background_color = `bg-${iconColor}`
  const RecordIcon = recordIcons[`${iconName}`]

  const handleClickComment = (commentId: number) => {
    if (isDragging) {
      setIsDragging(false)
      return
    }

    navigate(`/record/${recordId}?commentId=${commentId}`)
  }

  return (
    <div className="mb-4 px-6">
      <div className="ml-[2px] mt-6 flex items-center justify-between">
        <span
          className="cursor-pointer text-sm font-semibold"
          onClick={() => navigate(`/record/${recordId}`)}
        >
          {title}
        </span>
        <span
          className="cursor-pointer text-xs text-primary-2"
          onClick={() => navigate(`/record/${recordId}`)}
        >
          전체보기
        </span>
      </div>
      <div
        className="mt-4 flex cursor-pointer items-center gap-4 overflow-auto"
        ref={dragRef}
        onMouseDown={handleMouseDown}
      >
        <div onClick={() => navigate(`/record/${recordId}`)}>
          <div
            className={`${background_color} flex h-[86px] w-[86px] items-center rounded-2xl`}
          >
            <RecordIcon className="flex aspect-square w-full" />
          </div>
        </div>
        <div className="flex gap-2">
          {memoryRecordComments.map(({ commentId, content }) => (
            <div
              key={commentId}
              className="h-[86px] w-40 rounded-2xl bg-grey-2 py-4 px-5"
              onClick={() => handleClickComment(commentId)}
            >
              <div className="line-clamp h-[54px] w-full overflow-hidden leading-[18px]">
                <span className="text-xs">{content}</span>
              </div>
            </div>
          ))}
        </div>
        {memoryRecordComments.length > 4 && (
          <div
            className="ml-2 flex h-full flex-col items-center justify-center"
            onClick={() => navigate(`/record/${recordId}`)}
          >
            <PlusIcons />
            <p className="mt-[10px] w-[50px] text-primary-2">전체보기</p>
          </div>
        )}
      </div>
    </div>
  )
}
// e: React.MouseEvent<HTMLDivElement, MouseEvent>,
