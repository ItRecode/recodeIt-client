import React from 'react'
import { ReactComponent as SpinnerIcon } from '@assets/spinner.svg'

interface ISpinnerProps {
  size?: 'small' | 'large' | 'button'
}

export default function Spinner({ size = 'small' }: ISpinnerProps) {
  const setSpinnerSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-9 h-9'
      case 'large':
        return 'w-[129px] h-[129px]'
      case 'button':
        return 'w-10 h-10'
    }
  }

  return <SpinnerIcon className={`z-10 animate-spin ${setSpinnerSize(size)}`} />
}
