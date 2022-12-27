import React from 'react'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  property?: 'default' | 'success' | 'error'
  name: string
  label?: string
  placeholder?: string
  value?: number | string
  message?: string
  focus?: boolean
  autoFocus?: boolean
  maxLength?: number
}

export default function Input({
  property = 'default',
  name,
  label,
  placeholder,
  value,
  message,
  autoFocus = true,
  maxLength,
  ...props
}: InputPropsType) {
  const setClassNameByProperty = (property: string) => {
    if (property === 'error') return 'border-b-sub-1'
    if (property === 'success') return 'border-b-primary-1'

    return 'border-b-grey-4'
  }

  return (
    <div>
      {label && <p className="pb-6">{label}</p>}
      <div className="relative flex items-center">
        <input
          type="search"
          name={name}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={`w-full border-b border-solid pt-4 pb-4 placeholder:text-sm 
          focus:outline-none ${setClassNameByProperty(property)}
        `}
          {...props}
        />
        <CloseIcon className="absolute right-0 hover:cursor-pointer" />
      </div>
      {property !== 'default' && (
        <p
          className={`pt-3 text-sm text-${
            property === 'success' ? 'text-primary-2' : 'text-sub-1'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
