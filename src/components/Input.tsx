import React from 'react'

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  property?: 'default'
  name: string
  label?: string
  placeholder?: string
  value?: number | string
  message?: string
  autoFocus?: boolean
}

export default function Input({
  property = 'default',
  name,
  label,
  placeholder,
  value,
  message,
  autoFocus = true,
  ...props
}: InputPropsType) {
  return (
    <div>
      <p className="pb-6">{label}</p>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full border-b border-b-grey-4 pt-4 pb-4 placeholder:text-sm`}
        autoFocus={autoFocus}
        {...props}
      />
      <p className="pt-3 text-sm text-primary-2">{message}</p>
    </div>
  )
}
