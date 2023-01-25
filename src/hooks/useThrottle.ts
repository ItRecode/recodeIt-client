import { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = <T extends any[]>(
  callback: (...params: T) => void,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...params: T) => {
    if (!timer.current) {
      callback(...params)
      timer.current = setTimeout(() => {
        timer.current = null
      }, delay)
    }
  }
}
