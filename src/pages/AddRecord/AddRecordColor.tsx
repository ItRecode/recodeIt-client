import React, { useState } from 'react'
import { ReactComponent as Check } from '@assets/check.svg'

function AddRecordColor() {
  const [colors, setColors] = useState([
    { src: 'bg-icon-purple', choosed: true, id: 0 },
    { src: 'bg-icon-yellow', choosed: false, id: 1 },
    { src: 'bg-icon-pink', choosed: false, id: 2 },
    { src: 'bg-icon-blue', choosed: false, id: 3 },
    { src: 'bg-icon-green', choosed: false, id: 4 },
  ])

  const handleChooseCurrentColor = (index: number): void => {
    const changeCurrent = colors.map((color, currentIndex) => ({
      ...color,
      choosed: currentIndex === index,
    }))
    setColors(changeCurrent)
  }

  return (
    <div className="mb-10 flex justify-between">
      {colors.map((color, index) => {
        return (
          <div className="relative" key={color.id}>
            <div
              className={`h-[46px] w-[46px] rounded-full ${color.src}`}
              onClick={() => handleChooseCurrentColor(index)}
            />
            {color.choosed && (
              <Check
                style={{ left: '14px', top: '14px' }}
                className="absolute "
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AddRecordColor
