import useClickOutside from '@hooks/useClickOutside'
import React, { Dispatch, SetStateAction } from 'react'

interface CalendarProps {
  setIsOpenCalendar: Dispatch<SetStateAction<boolean>>
}

export default function Calendar({ setIsOpenCalendar }: CalendarProps) {
  const calendarRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpenCalendar(false)
  })

  return (
    <div className="fixed top-0 z-20 block h-full w-full ">
      <div className="absolute h-full w-screen max-w-[420px] bg-grey-10 opacity-50" />
      <div
        ref={calendarRef}
        className="fixed bottom-0 z-20 flex h-[478px] w-full max-w-[420px] animate-[popUp_150ms_linear] flex-col items-center justify-center rounded-t-2xl bg-grey-1"
      >
        Calendar
      </div>
    </div>
  )
}
