import { ADD_RECORD_ICONS } from '@assets/constant/RecordIcons'
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { ReactComponent as Front } from '@assets/front.svg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRecoilState } from 'recoil'
import { formDataAtom } from '@store/atom'
import { useThrottle } from '@hooks/useThrottle'

type IconSource = {
  src: string
  id: number
}

export type IconType = {
  celebration: IconSource[]
  consolation: IconSource[]
}

interface Props {
  currentRecordType: keyof IconType
  recordIcon: string
}

function AddRecordIcon({ currentRecordType, recordIcon }: Props) {
  const icons = ADD_RECORD_ICONS

  const [iconState, setIconState] = useState<IconType>(icons)
  const [currentFocus, setCurrentFocus] = useState<number>(0)
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const MAX_FOCUS = currentRecordType === 'celebration' ? 6 : 5
  const MIN_FOCUS = 0
  const slickRef = useRef<Slider | null>(null)
  const TIME_DELAY_MS = 500

  useEffect(() => {
    setIconState(icons)
    const getRecordNumber = icons[currentRecordType]?.filter((record) => {
      if (record.src.indexOf(recordIcon) !== -1) {
        return record.id
      }
    })[0]
    if (getRecordNumber) {
      setCurrentFocus(getRecordNumber.id)
      setFormData({
        ...formData,
        selectedIcon: getIconSrc(
          icons[currentRecordType][getRecordNumber.id].src
        ),
      })
      slickRef.current?.slickGoTo(getRecordNumber.id)
    }
  }, [currentRecordType])

  useEffect(() => {
    setFormData({
      ...formData,
      selectedIcon: getIconSrc(icons[currentRecordType][currentFocus].src),
    })
  }, [currentFocus])

  const handleFront = () => {
    slickRef.current?.slickNext()
    if (currentFocus === MAX_FOCUS) {
      setCurrentFocus(0)
    } else {
      setCurrentFocus(currentFocus + 1)
    }
  }

  const handleBack = () => {
    slickRef.current?.slickPrev()
    if (currentFocus === MIN_FOCUS) {
      setCurrentFocus(MAX_FOCUS)
    } else {
      setCurrentFocus(currentFocus - 1)
    }
  }

  const settings = {
    arrows: false,
    infinite: true,
    speed: TIME_DELAY_MS,
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
        onClick={useThrottle(handleBack, TIME_DELAY_MS)}
      >
        <Back />
      </div>
      <div
        className="absolute top-[1/2] right-0 cursor-pointer"
        onClick={useThrottle(handleFront, TIME_DELAY_MS)}
      >
        <Front />
      </div>
    </div>
  )
}

export default AddRecordIcon
