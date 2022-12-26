import React from 'react'

interface chipProps {
  active: boolean
  icon: string | null
  message: string
}

function Chip({ active, icon, message }: chipProps) {
  return (
    <button
      className={`cursor-pointer rounded-[999px] px-4 py-3 text-sm ${
        active ? ' bg-primary-2 text-gray-100' : ' bg-gray-200 text-gray-400'
      }`}
    >
      {icon && <img className=" mr-2" src={icon} />}
      <span>{message}</span>
    </button>
  )
}

export default Chip
