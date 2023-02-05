import { getMixRecordData } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { IMixRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import Spinner from '@components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { scrollTarget } from '@store/atom'

export default function MixRecord() {
  const navigate = useNavigate()
  const setScrollTargetId = useSetRecoilState(scrollTarget)

  const [mixRecordData, setMixRecordData1] = useState<IMixRecordData[] | null>(
    null
  )
  const stopRef = useRef<Slider>(null)
  const [dataState, setDataState] = useState({
    activeSlide: 0,
    activeSlide2: 0,
  })
  const [sliderStop, setSliderStop] = useState(false)

  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (current: number, next: number) =>
      setDataState((prev) => {
        return { ...prev, activeSlide: next }
      }),
    afterChange: (current: number) =>
      setDataState((prev) => {
        return { ...prev, activeSlide2: current }
      }),
  }

  const {
    data: initailMixData,
    isLoading,
    refetch,
  } = useQuery(['mixRecordData'], () => getMixRecordData(), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (initailMixData) {
      if (mixRecordData !== null) {
        setMixRecordData1((prev) => {
          if (prev !== null) {
            return [...prev, ...initailMixData.data.mixRecordDto]
          }
          return prev
        })
      } else {
        setMixRecordData1(initailMixData.data.mixRecordDto)
      }
    }
  }, [initailMixData])

  const deleteData = () => {
    setMixRecordData1((prev) => {
      if (prev !== null) {
        return prev.slice(10)
      }
      return prev
    })
  }

  const stopSlider = () => {
    if (stopRef.current !== null) {
      if (!sliderStop) {
        stopRef.current.slickPause()
      } else {
        stopRef.current.slickPlay()
      }
    }
    setSliderStop((prev) => !prev)
  }

  const handleClick = (recordId: number, commentId?: number) => {
    if (commentId !== undefined) {
      setScrollTargetId((prev) => {
        return { ...prev, commentId }
      })
    }
    navigate(`/record/${recordId}`)
  }

  useEffect(() => {
    if (dataState.activeSlide === 8 && dataState.activeSlide2 === 8) {
      refetch()
    }
    if (dataState.activeSlide === 18 && dataState.activeSlide2 === 18) {
      deleteData()
    }
  }, [dataState])

  return (
    <div className="relative flex w-full items-center justify-center">
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <>
          <Slider
            ref={stopRef}
            {...sliderSettings}
            className="h-[326px] w-full"
          >
            {mixRecordData !== null &&
              mixRecordData.map((item, index) => {
                const colorName = `bg-${item.colorName}`
                const RecordIcon = recordIcons[`${item.iconName}`]
                return (
                  <div
                    key={index}
                    className={`!flex h-[326px] !w-[420px] flex-col items-center ${colorName}`}
                  >
                    <RecordIcon
                      width={100}
                      height={100}
                      className="mt-16 cursor-pointer"
                      onClick={() => handleClick(item.recordId)}
                    />
                    <p
                      className="mt-2 w-[160px] cursor-pointer text-center text-[12px] leading-normal text-grey-1"
                      onClick={() => handleClick(item.recordId, item.commentId)}
                    >
                      {item.commentContent}
                    </p>
                  </div>
                )
              })}
          </Slider>
          <div className="absolute bottom-[25px] flex w-full justify-center bg-inherit">
            <button
              className="h-[32px] w-[118px] cursor-pointer rounded-full bg-grey-1/50 text-grey-1"
              onClick={stopSlider}
            >
              {sliderStop ? '믹스 레코드 멈춤' : '믹스 레코드 재생중'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
