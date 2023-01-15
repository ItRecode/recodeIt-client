import React from 'react'
import { ReactComponent as SpinnerIcon } from '@assets/spinner.svg'

interface ISpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

export default function Spinner({ size = 'small' }: ISpinnerProps) {
  const setSpinnerSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-9 h-9'
      case 'medium':
        return 'w-[70px] h-[70px]'
      case 'large':
        return 'w-[129px] h-[129px]'
    }
  }

  return <SpinnerIcon className={`z-10 animate-spin ${setSpinnerSize(size)}`} />
}
