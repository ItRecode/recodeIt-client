import { ADD_RECORD_ICONS } from '@assets/constant/RecordIcons'
import React, { useState } from 'react'

type IconSource = {
  src: string
  choosed: boolean
  id: number
}

export type IconType = {
  celebration: IconSource[]
  consolation: IconSource[]
}

function AddRecordIcon({
  currentRecordType,
}: {
  currentRecordType: keyof IconType
}) {
  const icons = ADD_RECORD_ICONS

  const [iconState, setIconState] = useState<IconType>(icons)

  const handleChooseCurrentIcon = (index: number): void => {
    const currentState = {
      ...iconState,
      [currentRecordType]: icons[currentRecordType].map((icon) => ({
        ...icon,
        choosed: icon.id === index,
      })),
    }
    setIconState(currentState)
  }

  return (
    <div className="mr-[-24px] mb-10 flex w-[calc(100%+24*2)] justify-between gap-x-[30px] overflow-scroll">
      {iconState[currentRecordType].map((icon) => {
        return (
          <div
            onClick={() => handleChooseCurrentIcon(icon.id)}
            className={`relative h-[70px] w-[70px] rounded-2xl ${
              icon.choosed && 'border-2 border-primary-3'
            }`}
            key={icon.id}
          >
            <img
              className="block translate-x-[-2px] translate-y-[-2px]"
              src={icon.src}
              alt={`icon-${icon.id}-type`}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AddRecordIcon
