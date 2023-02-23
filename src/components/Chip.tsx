import React, { useEffect, useRef } from 'react'
import { checkFromDetailPage } from '@store/detailPageAtom'
import { useRecoilValue } from 'recoil'

interface chipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined
  active: boolean
  icon: string | null
  message: string
  pointer?: boolean
  property?: 'default' | 'small'
  isModify?: boolean
}

function Chip({
  active,
  icon = null,
  message,
  type,
  pointer = true,
  property = 'default',
  isModify,
  ...props
}: chipProps) {
  const scrollRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active) {
      scrollRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [])

  return (
    <button
      ref={scrollRef}
      {...props}
      type={type}
      className={`flex shrink-0 items-center justify-between rounded-full
        ${pointer && 'cursor-pointer'}
        ${
          active
            ? `${isModify ? 'bg-grey-7' : 'bg-primary-2'} text-grey-1`
            : ' bg-grey-2 text-grey-4'
        }
        ${property === 'default' ? 'px-4 py-3' : 'px-3 py-[9px]'}
      `}
    >
      {icon && (
        <img className="mr-2 aspect-square w-[14px] object-cover" src={icon} />
      )}
      <p className="flex items-center text-[14px] leading-none">{message}</p>
    </button>
  )
}

export default Chip
