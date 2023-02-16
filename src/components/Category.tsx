import { useGetCategory } from '@react-query/hooks/useGetCategory'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { parentCategoryID } from 'types/category'
import { getChipIconName } from '@pages/DetailRecord/getChipIconName'
import Chip from './Chip'
import useSwipe from '@hooks/useSwipe'
import { CELEBRATION_ID, CONSOLATION_ID } from '@assets/constant/constant'

export default function Category({
  slider,
  parentCategoryId,
  choosedCategoryId,
  setChoosedCategoryId,
  isModify = false,
}: {
  slider: boolean
  parentCategoryId: parentCategoryID
  choosedCategoryId: number
  setChoosedCategoryId: Dispatch<SetStateAction<number>>
  isModify?: boolean
}) {
  const { categoryData } = useGetCategory(parentCategoryId)

  const dragRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>
  const { handleMouseDown, isDragging, setIsDragging } = useSwipe(dragRef)

  useEffect(() => {
    if (slider) {
      if (parentCategoryId === CELEBRATION_ID)
        setChoosedCategoryId(CELEBRATION_ID)
      if (parentCategoryId === CONSOLATION_ID)
        setChoosedCategoryId(CONSOLATION_ID)
    }
    if (!slider) {
      if (parentCategoryId === CELEBRATION_ID) setChoosedCategoryId(3)
      if (parentCategoryId === CONSOLATION_ID) setChoosedCategoryId(7)
    }
  }, [parentCategoryId])

  const handleClickChip = (id?: number) => {
    if (slider && isDragging) {
      setIsDragging(false)
      return
    }
    if (id !== undefined) {
      setChoosedCategoryId(id)
    } else {
      setChoosedCategoryId(parentCategoryId)
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
      {slider && (
        <Chip
          icon={null}
          active={choosedCategoryId === 1 || choosedCategoryId === 2}
          message="전체"
          type={'button'}
          onClick={() => handleClickChip()}
        />
      )}
      {categoryData &&
        categoryData.map((item) => (
          <Chip
            key={item.id}
            active={item.id === choosedCategoryId}
            icon={getChipIconName(item.name)}
            message={item.name}
            type={'button'}
            onClick={() => handleClickChip(item.id)}
            isModify={isModify}
          />
        ))}
    </div>
  )
}
