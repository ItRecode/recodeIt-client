import React, { useState } from 'react'
import { ReactComponent as Check } from '@assets/check.svg'

function AddRecordColor() {
  const [colors, setColors] = useState([
    { src: '#8865D3', choosed: true, id: 0 },
    { src: '#D6B967', choosed: false, id: 1 },
    { src: '#D78A86', choosed: false, id: 2 },
    { src: '#6F99F2', choosed: false, id: 3 },
    { src: '#78BCB7', choosed: false, id: 4 },
  ])
  console.log(colors)

  const handleCurrentColor = (index: number): void => {
    console.log(index)
    colors[index]
    const changeCurrent = colors.map((color, currentIndex) => {
      if (currentIndex === index) return { ...color, choosed: true }
      return { ...color, choosed: false }
    })
    console.log(changeCurrent)
    setColors(changeCurrent)
  }

  return (
    <div className="flex justify-between mb-10">
      {colors.map((color, index) => {
        return (
          <div className="relative" key={index}>
            <div
              className=" rounded-full"
              onClick={() => handleCurrentColor(index)}
              style={{
                backgroundColor: color.src,
                width: '46px',
                height: '46px',
              }}
            />
            {color.choosed ? (
              <Check
                style={{ left: '14px', top: '14px' }}
                className="absolute "
              />
            ) : (
              ''
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AddRecordColor
