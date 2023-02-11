import React from 'react'
import Slider from 'react-slick'
import Button from '@components/Button'
import { MONTH_LISt, YEAR_LIST } from './getMonthYearList'

export default function CalendarMonthYear() {
  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    Infinity: true,
    focusOnSelect: true,
    // variableWidth: true, : select는 조금 높게 가장 끝은 얇게
  }

  return (
    <div className="mt-6">
      <div className="flex">
        <Slider {...sliderSettings}>
          {YEAR_LIST.map((year) => (
            <div key={year} className="py-[8px]">
              <span className="text-[20px] font-semibold text-grey-8">
                {year}년
              </span>
            </div>
          ))}
        </Slider>
        <Slider {...sliderSettings}>
          {MONTH_LISt.map((month) => (
            <div key={month} className="py-[8px]">
              <span className="text-[20px] font-semibold text-grey-8">
                {month}월
              </span>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-8 flex gap-2">
        <Button aria-label="select-month-year-cancel-button">취소</Button>
        <Button aria-label="select-month-year-confirm-button">확인</Button>
      </div>
    </div>
  )
}
