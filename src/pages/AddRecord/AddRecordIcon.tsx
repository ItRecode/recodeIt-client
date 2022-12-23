import React, { useState } from 'react'
import Test from '@assets/test.svg'

export type IconType = {
  celebration: any
  consolation: any
}

function AddRecordIcon({
  currentRecordType,
}: {
  currentRecordType: keyof IconType
}) {
  const icons = {
    celebration: [
      { src: Test, choosed: true, id: 0 },
      { src: Test, choosed: false, id: 1 },
      { src: Test, choosed: false, id: 2 },
      { src: Test, choosed: false, id: 3 },
      { src: Test, choosed: false, id: 4 },
    ],
    consolation: [
      { src: Test, choosed: true, id: 0 },
      { src: Test, choosed: false, id: 1 },
      { src: Test, choosed: false, id: 2 },
      { src: Test, choosed: false, id: 3 },
      { src: Test, choosed: false, id: 4 },
    ],
  }

  const [iconState, setIconState] = useState<IconType>(icons)

  const handleChooseCurrentIcon = (index: number): void => {
    iconState[currentRecordType] = icons[currentRecordType].map((icon) => ({
      ...icon,
      choosed: icon.id === index,
    }))
    setIconState(iconState)
  }

  return (
    <div className="mb-10 flex justify-between">
      {icons[currentRecordType].map((icon, index) => {
        return (
          <div className="relative" key={icon.id}>
            <img
              className=" block border-4"
              onClick={() => handleChooseCurrentIcon(index)}
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
