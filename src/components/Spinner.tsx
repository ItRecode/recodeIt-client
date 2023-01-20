import React from 'react'
import { ReactComponent as SpinnerIcon } from '@assets/spinner.svg'

interface ISpinnerProps {
  size?: 'small' | 'large' | 'button'
}

export default function Spinner({ size = 'small' }: ISpinnerProps) {
  const setSpinnerSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-10 h-10'
      case 'large':
        return 'w-[85] h-[85]'
      case 'button':
        return 'w-10 h-10'
    }
  }

  return <SpinnerIcon className={`z-10 animate-spin ${setSpinnerSize(size)}`} />
}
