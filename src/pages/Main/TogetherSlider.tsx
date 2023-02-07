import React, { useEffect, useRef } from 'react'
import { IRandomRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { useNavigate } from 'react-router-dom'
import useSwipe from '@hooks/useSwipe'
import { parentCategoryID } from 'types/category'
import { useCheckMobile } from '@hooks/useCheckMobile'

export default function TogetherSlider({
  randomRecordData,
  categoryId,
}: {
  randomRecordData: IRandomRecordData[] | null
  categoryId: parentCategoryID
}) {
  const navigate = useNavigate()
  const { isMobile } = useCheckMobile()

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

  useEffect(() => {
    dragRef.current.scrollLeft = 0
  }, [categoryId])

  return (
    <div
      className="relative ml-6 flex h-full flex-nowrap overflow-scroll"
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
              className={`mr-1.5 h-full w-[164px] shrink-0 rounded-2xl ${colorName} flex cursor-pointer flex-col items-center justify-center`}
              onClick={() => handleClickRecord(item.recordId)}
            >
              <RecordIcon width={100} height={100} />
              <div className="mt-4 text-sm font-semibold text-grey-10">
                {!isMobile && item.title.length > 6 ? (
                  <>
                    <p>{item.title.substring(0, 6)}</p>
                    <p className="text-center">
                      {item.title
                        .substring(6)
                        .replaceAll('(^\\p{Z}+|\\p{Z}+$)', '')}
                    </p>
                  </>
                ) : (
                  item.title
                )}
              </div>
              <p className="mt-2.5 text-xs leading-none">
                댓글 {item.commentCount}개
              </p>
            </div>
          )
        })}
    </div>
  )
}
