import { useRef } from 'react'

export const useThrottle = <T extends any[]>(
  callback: (...params: T) => void,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...params: T) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params)
        timer.current = null
      }, delay)
    }
  }
}
