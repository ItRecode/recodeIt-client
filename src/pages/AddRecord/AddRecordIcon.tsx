import { ADD_RECORD_ICONS } from '@assets/constant/RecordIcons'
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { ReactComponent as Front } from '@assets/front.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRecoilState } from 'recoil'
import { formDataAtom } from '@store/atom'

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
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const SLIDE_SPEED = 500
  const MAX_FOCUS = currentRecordType === 'celebration' ? 6 : 5
  const MIN_FOCUS = 0
  const slickRef = useRef<Slider | null>(null)
  const [throttle, setThrottle] = useState<boolean>(false)

  useEffect(() => {
    setIconState(icons)
  }, [currentRecordType])

  useEffect(() => {
    setFormData({
      ...formData,
      selectedIcon: getIconSrc(icons[currentRecordType][currentFocus].src),
    })
  }, [currentFocus])

  const handleFront = () => {
    slickRef.current?.slickNext()
    if (throttle) return
    if (!throttle) {
      setThrottle(true)
      if (currentFocus === MAX_FOCUS) {
        setCurrentFocus(0)
      } else {
        setCurrentFocus(currentFocus + 1)
      }
      setTimeout(async () => {
        setThrottle(false)
      }, 500)
    }
  }

  const handleBack = () => {
    slickRef.current?.slickPrev()
    if (throttle) return
    if (!throttle) {
      setThrottle(true)
      if (currentFocus === MIN_FOCUS) {
        setCurrentFocus(MAX_FOCUS)
      } else {
        setCurrentFocus(currentFocus - 1)
      }
      setTimeout(async () => {
        setThrottle(false)
      }, 500)
    }
  }

  const settings = {
    arrows: false,
    infinite: true,
    speed: SLIDE_SPEED,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  const handleClick = (id: number) => {
    setCurrentFocus(id)
  }

  const getIconSrc = (iconSrc: string): string => {
    return iconSrc.split('/')[3].split('.')[0]
  }

  return (
    <div className="relative mb-10 flex items-center justify-between gap-x-[16px] px-3">
      <Slider ref={slickRef} className="w-full" {...settings}>
        {iconState[currentRecordType].map((icon) => {
          return (
            <div
              onClick={() => handleClick(icon.id)}
              className={`relative h-[54px] !w-[54px] rounded-2xl ${
                currentFocus === icon.id && ' border-2  !border-primary-3'
              }`}
              key={icon.id}
            >
              <img
                className="h-[52px] !w-[52px] translate-x-[-2px] translate-y-[-2px]"
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
