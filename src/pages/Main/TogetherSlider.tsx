import React, { useEffect, useRef } from 'react'
import { IRandomRecordData } from 'types/recordData'
import useSwipe from '@hooks/useSwipe'
import { parentCategoryID } from 'types/category'
import Card from '@components/Card'

export default function TogetherSlider({
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
            <Card
              key={item.recordId}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              item={item}
            />
          )
        })}
    </div>
  )
}
