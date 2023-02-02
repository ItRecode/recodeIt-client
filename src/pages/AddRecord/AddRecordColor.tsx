import React, { useEffect, useState } from 'react'
import { ReactComponent as Check } from '@assets/check.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formDataAtom, recordTypeAtom } from '@store/atom'
import {
  ADD_RECORD_COLORS,
  colorSourceType,
} from '@assets/constant/RecordColors'

interface Props {
  recordColor: string
}

function AddRecordColor({ recordColor }: Props) {
  const [colors, setColors] = useState<colorSourceType[]>(ADD_RECORD_COLORS)
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const currentRecordType = useRecoilValue(recordTypeAtom)

  useEffect(() => {
    setColors(
      colors.map((color: colorSourceType, index: number) => {
        if (index === 0) {
          return { ...color, choosed: true }
        }
        return { ...color, choosed: false }
      })
    )

    if (recordColor) {
      return setColors(
        ADD_RECORD_COLORS.map((color) => {
          return { ...color, choosed: color.src.indexOf(recordColor) !== -1 }
        })
      )
    }
  }, [currentRecordType])

  const handleChooseCurrentColor = (index: number): void => {
    const changeCurrent = colors.map((color) => ({
      ...color,
      choosed: color.id === index,
    }))
    const colorSrc = colors[index].src
    setFormData({
      ...formData,
      selectedColor: makeColorSrcToColor(colorSrc),
    })
    setColors(changeCurrent)
  }

  const makeColorSrcToColor = (colorSrc: string) => {
    return colorSrc.slice(colorSrc.indexOf('-') + 1)
  }

  return (
    <div className="relative z-0 mb-10 flex justify-between">
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
