import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMemoryRecord } from 'types/myRecord'

import useSwipe from '@hooks/useSwipe'
import recordIcons from '@assets/record_icons'
import { ReactComponent as PlusIcons } from '@assets/myRecordIcon/comment_plus.svg'
import { useSetRecoilState } from 'recoil'
import { scrollTarget } from '@store/atom'

export default function MemoryRecordCard({
  recordId,
  title,
  iconName,
  colorName,
  memoryRecordComments,
}: IMemoryRecord) {
  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>
  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)
  const navigate = useNavigate()
  const background_color = `bg-${colorName}`
  const RecordIcon = recordIcons[`${iconName}`]
  const setScrollTargetId = useSetRecoilState(scrollTarget)

  const handleClickComment = (commentId: number) => {
    if (isDragging) {
      setIsDragging(false)
      return
    }
    setScrollTargetId((prev) => {
      return { ...prev, commentId }
    })
    navigate(`/record/${recordId}`)
  }

  return (
    <div className="mb-4 px-6">
      <div className="ml-[2px] mt-6 flex">
        <span
          className="cursor-pointer text-sm font-semibold"
          onClick={() => navigate(`/record/${recordId}`)}
        >
          {title}
        </span>
      </div>
      <div
        className="mt-4 flex items-center gap-4 overflow-auto"
        ref={dragRef}
        onMouseDown={handleMouseDown}
      >
        <div onClick={() => navigate(`/record/${recordId}`)}>
          <div
            className={`${background_color} flex h-[86px] w-[86px] cursor-pointer items-center rounded-2xl`}
          >
            <RecordIcon className="flex aspect-square w-full" />
          </div>
        </div>
        {memoryRecordComments.length < 1 && (
          <div
            className="flex w-full flex-col text-center"
            onClick={() => navigate(`/record/${recordId}`)}
          >
            <p className="text-sm font-semibold">아직 댓글이 없어요</p>
            <p className="pt-1 text-xs">첫 번째 댓글을 기다리고 있어요.</p>
          </div>
        )}
        <div className="flex gap-2">
          {memoryRecordComments.map(({ commentId, content }) => (
            <div
              key={commentId}
              className="h-[86px] w-40 cursor-pointer rounded-2xl bg-grey-2 py-4 px-5"
              onClick={() => handleClickComment(commentId)}
            >
              <div className="line-clamp h-[54px] w-full overflow-hidden leading-[18px]">
                <span className="text-xs">
                  {content.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n')}
                </span>
              </div>
            </div>
          ))}
        </div>
        {memoryRecordComments.length > 4 && (
          <div
            className="ml-2 flex h-full cursor-pointer flex-col items-center justify-center"
            onClick={() => navigate(`/record/${recordId}`)}
          >
            <PlusIcons />
            <p className="mt-[10px] w-max text-primary-2">전체보기</p>
          </div>
        )}
      </div>
    </div>
  )
}
