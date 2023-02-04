import React, { useRef } from 'react'
import { IRandomRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { useNavigate } from 'react-router-dom'
import useSwipe from '@hooks/useSwipe'

export default function TogethderSlider({
  randomRecordData,
}: {
  randomRecordData: IRandomRecordData[] | null
}) {
  const navigate = useNavigate()

  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>

  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)

  const handleClickRecord = (recordId: number) => {
    if (isDragging) {
      setIsDragging(false)
      return
    }
    navigate(`/record/${recordId}`)
  }

  return (
    <div
      className="relative ml-6 flex h-full flex-nowrap overflow-x-hidden"
      ref={dragRef}
      onMouseDownCapture={(e) => {
        handleMouseDown(e)
      }}
    >
      {randomRecordData !== null &&
        randomRecordData.map((item) => {
          const colorName = `bg-${item.colorName}`
          const RecordIcon = recordIcons[`${item.iconName}`]
          return (
            <div
              key={item.recordId}
              className={`mr-1.5 h-full w-[164px] shrink-0 rounded-2xl ${colorName} flex items-center justify-center`}
            >
              <div
                className="flex cursor-pointer flex-col items-center justify-center hover:scale-110"
                onClick={() => handleClickRecord(item.recordId)}
              >
                <RecordIcon width={100} height={100} />
                <p className="mt-4 text-sm font-semibold leading-none text-grey-10">
                  {item.title}
                </p>
                <p className="mt-2.5 text-xs leading-none">
                  댓글 {item.commentCount}개
                </p>
              </div>
            </div>
          )
        })}
    </div>
  )
}
