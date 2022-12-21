import React from 'react'

interface ButtonPropsType {
  property?: 'solid' | 'primary' | 'default' | 'danger'
  small?: boolean
  active?: boolean
  children?: string
}

export default function Button({
  property = 'default',
  small = false,
  active = true,
  children,
}: ButtonPropsType) {
  return (
    <button
      disabled={active}
      className={`disabled: flex h-12  items-center justify-center rounded-2xl px-6 py-4 ${
        !small && ' w-85'
      } ${active ? 'cursor-pointer' : 'cursor-not-allowed'} ${
        property === 'solid'
          ? active
            ? 'bg-primary-2 text-grey-1 hover:bg-primary-1'
            : 'bg-inactive text-grey-1 '
          : ''
      } ${
        property === 'primary'
          ? active
            ? 'bg-primary-10  text-primary-3 hover:bg-primary-8 hover:text-primary-1'
            : 'bg-primary-10 text-primary-8'
          : ''
      } ${
        property === 'default'
          ? active
            ? 'border border-solid border-primary-3 bg-grey-1 text-primary-3 hover:border-primary-1 hover:text-primary-1'
            : 'border border-solid border-inactive text-inactive'
          : ''
      } ${
        property === 'danger'
          ? active
            ? 'border border-solid border-grey-6 bg-grey-1 text-grey-6 hover:border-danger hover:text-danger'
            : 'border border-solid border-inactive text-inactive'
          : ''
      }`}
    >
      {children}
    </button>
  )
}
