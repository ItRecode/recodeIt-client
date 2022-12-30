import React from 'react'

interface chipProps {
  active: boolean
  icon: string | null
  type?: 'button' | 'submit' | 'reset' | undefined
  message: string
}

function Chip({ active, icon = null, message, type }: chipProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-full px-4 py-3 text-sm ${
        active ? ' bg-primary-2 text-grey-1' : ' bg-grey-2 text-grey-4'
      }`}
    >
      {icon && <img className=" mr-2" src={icon} />}
      <span>{message}</span>
    </button>
  )
}

export default Chip
