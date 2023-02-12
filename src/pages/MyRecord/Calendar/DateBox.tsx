import React from 'react'

interface DateBoxProps {
  date: number
  gridColumnStart?: number
}

export default function DateBox({ date, gridColumnStart }: DateBoxProps) {
  return (
    <div
      className={`h-[36px] w-[36px] rounded-full text-[16px] font-medium text-grey-7`}
      style={{ gridColumnStart }}
    >
      <p className="flex h-full w-full items-center justify-center text-base font-medium leading-4">
        {date}
      </p>
    </div>
  )
}