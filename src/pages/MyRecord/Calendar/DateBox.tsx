import React from 'react'

interface DateBoxProps {
  date: number
  gridColumnStart?: number
  hasRecord: boolean
}

export default function DateBox({
  date,
  gridColumnStart,
  hasRecord,
}: DateBoxProps) {
  return (
    <div className={`h-[36px] w-[36px]`} style={{ gridColumnStart }}>
      <p
        className={`flex h-full w-full items-center justify-center text-[16px] leading-4 ${
          hasRecord ? 'font-bold text-primary-2' : 'font-medium  text-grey-7 '
        }`}
      >
        {date}
      </p>
    </div>
  )
}
