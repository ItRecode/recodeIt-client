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
        return 'w-[85px] h-[85px]'
      case 'button':
        return 'w-[30px] h-[30px]'
    }
  }

  return <SpinnerIcon className={`z-10 animate-spin ${setSpinnerSize(size)}`} />
}
