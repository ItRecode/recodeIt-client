import React from 'react'

interface chipProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  active: boolean
  icon: string | null
  message: string
  pointer?: boolean
  property?: 'default' | 'small'
}

function Chip({
  active,
  icon = null,
  message,
  type,
  pointer = true,
  property = 'default',
}: chipProps) {
  return (
    <button
      type={type}
      className={`flex items-center justify-between rounded-full
        ${pointer && 'cursor-pointer'}
        ${active ? ' bg-primary-2 text-grey-1' : ' bg-grey-2 text-grey-4'}
        ${property === 'default' ? 'px-4 py-3' : 'px-3 py-[9px]'}
      `}
    >
      {icon && <img className="mr-2 w-[12px] object-cover" src={icon} />}
      <span className="text-[14px] leading-none">{message}</span>
    </button>
  )
}

export default Chip
