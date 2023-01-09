import React from 'react'

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  property?: 'solid' | 'primary' | 'default' | 'danger'
  small?: boolean
  active?: boolean
  normal?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined

  children?: React.ReactElement | string
}

export default function Button({
  property = 'default',
  small = false,
  active = true,
  normal = false,
  disabled = false,
  type = 'button',
  children,
  ...props
}: ButtonPropsType) {
  const setClassNameByProperty = (property: string) => {
    switch (property) {
      case 'solid':
        return active
          ? 'bg-primary-2 text-grey-1 hover:bg-primary-1'
          : 'bg-inactive text-grey-1 '
      case 'primary':
        return active
          ? 'bg-primary-10  text-primary-2 hover:bg-primary-8 hover:text-primary-1'
          : 'bg-primary-10 text-primary-8'
      case 'default':
        return active
          ? 'border border-solid border-primary-3 bg-grey-1 text-primary-3 hover:border-primary-1 hover:text-primary-1'
          : 'border border-solid border-inactive text-inactive bg-grey-1'
      case 'danger':
        return active
          ? `border border-solid bg-grey-1 ${
              normal ? 'border-grey-6 text-grey-6' : 'border-danger text-danger'
            } hover:border-danger hover:text-danger`
          : 'border border-solid border-inactive text-inactive'
      default:
        return ''
    }
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={`disabled: flex h-12 items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold
      ${!small && ' w-full'} 
      ${active ? 'cursor-pointer' : 'cursor-not-allowed'} 
      ${setClassNameByProperty(property)}`}
      {...props}
    >
      {children}
    </button>
  )
}
