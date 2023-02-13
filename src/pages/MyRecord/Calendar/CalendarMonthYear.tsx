import React from 'react'
import Button from '@components/Button'
import { MONTH_LISt, YEAR_LIST } from './getMonthYearList'

export default function CalendarMonthYear() {
  return (
    <div className="mt-6">
      <div className="flex">
        <div className="w-1/2">
          {YEAR_LIST.map((year) => (
            <div key={year} className="py-[8px]">
              <span className="text-[20px] font-semibold text-grey-8">
                {year}년
              </span>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          {MONTH_LISt.map((month) => (
            <div key={month} className="py-[8px]">
              <span className="text-[20px] font-semibold text-grey-8">
                {month}월
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        <Button aria-label="select-month-year-cancel-button">취소</Button>
        <Button aria-label="select-month-year-confirm-button">확인</Button>
      </div>
    </div>
  )
}
