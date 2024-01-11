import React, { useEffect, useRef } from 'react'
import { IRandomRecordData } from 'types/recordData'
import useSwipe from '@hooks/useSwipe'
import { parentCategoryID } from 'types/category'
import RecordCard from '@components/RecordCard'

function TogetherSlider({
  randomRecordData,
  parentCategoryId,
}: {
  randomRecordData: IRandomRecordData[] | null
  parentCategoryId: parentCategoryID
}) {
  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>

  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)

  useEffect(() => {
    dragRef.current.scrollLeft = 0
  }, [parentCategoryId])

  return (
    <div
      className="relative ml-6 flex h-full flex-nowrap gap-1.5 overflow-scroll pr-4"
      ref={dragRef}
      onMouseDownCapture={(e) => {
        handleMouseDown(e)
      }}
    >
      {randomRecordData !== null &&
        randomRecordData.map((item) => {
          return (
            <RecordCard
              type="mainRecord"
              key={item.recordId}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              title={item.title}
              colorName={item.colorName}
              iconName={item.iconName}
              commentCount={item.commentCount}
              recordId={item.recordId}
            />
          )
        })}
    </div>
  )
}

export const MemoizedTogetherSlider = React.memo(TogetherSlider)
