import { useGetCategoty } from '@react-query/hooks/useGetCategory'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { parentCategoryID } from 'types/category'
import { getChipIconName } from '@pages/DetailRecord/getChipIconName'
import Chip from './Chip'
import useSwipe from '@hooks/useSwipe'

export default function Category({
  slider,
  parrentCategoryId,
  choosedCategoryId,
  setChoosedCategoryId,
}: {
  slider: boolean
  parrentCategoryId: parentCategoryID
  choosedCategoryId: number
  setChoosedCategoryId: Dispatch<SetStateAction<number>>
}) {
  const { categoryData } = useGetCategoty(parrentCategoryId)

  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>
  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)

  useEffect(() => {
    setChoosedCategoryId(0)
  }, [parrentCategoryId])

  const handleClickChip = (id?: number) => {
    if (isDragging) {
      setIsDragging(false)
      return
    }
    if (id !== undefined) {
      setChoosedCategoryId(id)
    } else {
      setChoosedCategoryId(0)
    }
  }
  return (
    <div
      className={`flex pr-4 ${
        slider ? 'gap-1 overflow-scroll ' : 'flex-wrap gap-2'
      }`}
      ref={dragRef}
      onMouseDownCapture={(e) => {
        handleMouseDown(e)
      }}
    >
      <Chip
        icon={null}
        active={choosedCategoryId === 0}
        message="전체"
        type={'button'}
        onClick={() => handleClickChip()}
      />
      {categoryData &&
        categoryData.map((item) => (
          <Chip
            key={item.id}
            active={item.id === choosedCategoryId}
            icon={getChipIconName(item.name)}
            message={item.name}
            type={'button'}
            onClick={() => handleClickChip(item.id)}
          />
        ))}
    </div>
  )
}
