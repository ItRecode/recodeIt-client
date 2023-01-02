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
  onRemove?: (isRemove: boolean) => void
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
  onRemove,
  ...props
}: InputPropsType) {
  const setClassNameByProperty = (property: string) => {
    if (property === 'error') return 'border-b-sub-1'
    if (property === 'success') return 'border-b-primary-1'

    return 'border-b-grey-4'
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove(true)
    }
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
          className={`w-full border-b border-solid py-4 placeholder:text-sm focus:outline-none
            ${setClassNameByProperty(property)}
          `}
          {...props}
        />
        <CloseIcon
          className="absolute right-0 hover:cursor-pointer"
          onClick={handleRemove}
        />
      </div>
      {property !== 'default' && (
        <p
          className={`pt-3 text-sm ${
            property === 'success' ? 'text-primary-2' : 'text-sub-1'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
