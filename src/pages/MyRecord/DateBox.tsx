import React from 'react'

interface DateBoxProps {
  date: number
}

export default function DateBox({ date }: DateBoxProps) {
  return (
    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-10">
      <p className="flex h-full w-full items-center justify-center text-base font-medium leading-4">
        {date}
      </p>
    </div>
  )
}
