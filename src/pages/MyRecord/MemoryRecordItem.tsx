import React, { MutableRefObject, useRef } from 'react'
import { IMemoryRecord } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { useNavigate } from 'react-router-dom'
import useSwipe from '@hooks/useSwipe'

export default function MemoryRecordItem({
  recordId,
  title,
  iconName,
  iconColor,
  commentList,
}: IMemoryRecord) {
  const dragRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>
  const { handleMouseDown } = useSwipe(dragRef)
  const navigate = useNavigate()
  const background_color = `bg-${iconColor}`
  const RecordIcon = recordIcons[`${iconName}`]

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
        className="mt-4 flex cursor-grab gap-4 overflow-auto scroll-smooth"
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
          {commentList.map(({ commentId, content }) => (
            <div
              key={commentId}
              className="h-[86px] w-40 rounded-2xl bg-grey-2 py-4 px-5"
              onClick={() =>
                navigate(`/record/${recordId}?commentId=${commentId}`)
              }
            >
              <div className="line-clamp h-[54px] w-full overflow-hidden leading-[18px]">
                <span className="text-xs">{content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
