import { ADD_RECORD_ICONS } from '@assets/constant/RecordIcons'
import { formDataAtom } from '@store/atom'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ReactComponent as Back } from '@assets/back.svg'
import { ReactComponent as Front } from '@assets/front.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type IconSource = {
  src: string
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
  const [currentFocus, setCurrentFocus] = useState<number>(0)
  const MAX_FOCUS = currentRecordType === 'celebration' ? 6 : 5
  const MIN_FOCUS = 0
  const slickRef = useRef<Slider | null>(null)

  useEffect(() => {
    setIconState(icons)
  }, [currentRecordType])

  const handleFront = () => {
    slickRef.current?.slickNext()
    if (currentFocus === MAX_FOCUS) {
      return setCurrentFocus(0)
    }
    return setCurrentFocus(currentFocus + 1)
  }

  const handleBack = () => {
    slickRef.current?.slickPrev()
    if (currentFocus === MIN_FOCUS) {
      return setCurrentFocus(MAX_FOCUS)
    }
    return setCurrentFocus(currentFocus - 1)
  }

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <div className="relative mb-10 flex items-center justify-between gap-x-[16px] px-3">
      <Slider ref={slickRef} className="w-full" {...settings}>
        {iconState[currentRecordType].map((icon) => {
          return (
            <div
              onClick={() => setCurrentFocus(icon.id)}
              className={`relative h-[70px] !w-[70px] rounded-2xl ${
                currentFocus === icon.id && 'border-2 !border-primary-3'
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
      </Slider>
      <div
        className="absolute top-[1/2] left-0 cursor-pointer"
        onClick={handleBack}
      >
        <Back />
      </div>
      <div
        className="absolute top-[1/2] right-0 cursor-pointer"
        onClick={handleFront}
      >
        <Front />
      </div>
    </div>
  )
}

export default AddRecordIcon
