import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Modal from './Modal'

interface IToastProps {
  visible: boolean
  message: ReactNode
  timeLimit?: number
  onClose: () => void
  hasSecondMessage?: boolean
  size?: 'big' | 'basic'
}

function Toast({
  visible,
  message,
  timeLimit = 2,
  onClose,
  hasSecondMessage = true,
  size = 'basic',
}: IToastProps) {
  const [times, setTimes] = useState(timeLimit)
  const interval: { current: NodeJS.Timeout | undefined } = useRef()
  useEffect(() => {
    if (times === 0) {
      onClose()
    } else {
      interval.current = setInterval(() => {
        setTimes(times - 1)
      }, 1000)
      return () => clearInterval(interval.current)
    }
  }, [times])

  return (
    <Modal visible={visible} onClose={onClose}>
      <div
        className={`flex ${
          size === 'basic' ? 'h-[124px]' : 'h-[148px]'
        } w-[270px] flex-col justify-center px-12 py-6`}
      >
        <div className="mb-4 text-center font-semibold leading-normal text-grey-10">
          {message}
        </div>
        {hasSecondMessage && (
          <p className="text-center text-xs font-medium text-grey-8">
            <span className="text-primary-2">{times}</span>초 뒤에 사라집니다.
          </p>
        )}
      </div>
    </Modal>
  )
}

export default Toast
