import React, { ReactElement, useEffect, useRef, useState } from 'react'

interface SmallToastProps {
  children: ReactElement
  timeLimit?: number
  onClose: () => void
}

function SmallToast({ children, timeLimit = 2, onClose }: SmallToastProps) {
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

  return <div>{children}</div>
}

export default SmallToast
