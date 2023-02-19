import React, { Dispatch, SetStateAction, useState } from 'react'
import Slider from 'react-slick'
import Button from '@components/Button'
import { getMonthYearDetail, MonthYear } from './getCalendarDetail'

interface CalendarMonthYearProps extends Pick<MonthYear, 'month' | 'year'> {
  setMonthYear: Dispatch<SetStateAction<MonthYear>>
  setIsChangedMonthYear: Dispatch<SetStateAction<boolean>>
}

export default function CalendarMonthYear({
  month,
  year,
  setMonthYear,
  setIsChangedMonthYear,
}: CalendarMonthYearProps) {
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedYear, setSelectedYear] = useState(year)
  const todayYear = new Date().getFullYear()

  const MONTH_LIST = [
    ...Array.from(Array(12 - month + 1), (_, index) => index + month),
    ...Array.from(Array(month - 1), (_, index) => index + 1),
  ]
  const YEAR_LIST = [
    ...Array.from(Array(todayYear - year + 1), (_, index) => index + year),
    ...Array.from(Array(year - 2011), (_, index) => index + 2011),
  ]

  const sliderSettings = {
    arrows: false,
    className: 'center',
    centerPadding: '0px',
    slidesToShow: 5,
    centerMode: true,
    Infinity: true,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
  }

  const handleSelectYear = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLLIElement
    setSelectedYear(parseInt(target.getAttribute('data-value') as string, 10))
  }

  const handleSelectMonth = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.currentTarget as HTMLLIElement
    setSelectedMonth(parseInt(target.getAttribute('data-value') as string, 10))
  }

  const setSelectedMonthYear = () => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1)
    setMonthYear(getMonthYearDetail(selectedDate))
    setIsChangedMonthYear(false)
  }

  return (
    <div className="mt-6">
      <div className="flex gap-1">
        <Slider
          {...sliderSettings}
          className="w-1/2 cursor-pointer text-center"
        >
          {YEAR_LIST.map((year) => (
            <li
              key={year}
              data-value={year}
              className="slick-select w-full py-[10px]"
              onClick={(e) => handleSelectYear(e)}
            >
              <span
                data-value={year}
                className="text-[20px] font-semibold text-grey-8"
              >
                {year}년
              </span>
            </li>
          ))}
        </Slider>
        <Slider
          {...sliderSettings}
          className="w-1/2 cursor-pointer text-center"
        >
          {MONTH_LIST.map((month) => (
            <li
              key={month}
              data-value={month}
              className="slick-select w-full py-[10px]"
              onClick={(e) => handleSelectMonth(e)}
            >
              <span
                data-value={month}
                className="text-[20px] font-semibold text-grey-8"
              >
                {month}월
              </span>
            </li>
          ))}
        </Slider>
      </div>
      <div className="mt-8 flex gap-2">
        <Button
          aria-label="select-month-year-cancel-button"
          onClick={() => setIsChangedMonthYear(false)}
        >
          취소
        </Button>
        <Button
          aria-label="select-month-year-confirm-button"
          onClick={setSelectedMonthYear}
        >
          확인
        </Button>
      </div>
    </div>
  )
}
