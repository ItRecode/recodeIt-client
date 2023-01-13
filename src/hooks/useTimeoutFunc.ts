import { useCallback, useEffect, useRef } from 'react'

type TimeoutFuncType = (
  func: () => void,
  delay: number
) => [run: () => void, clear: () => void]

const useTimeoutFn: TimeoutFuncType = (func, delay) => {
  const timeoutId = useRef<NodeJS.Timeout>()
  const callback = useRef(func)

  useEffect(() => {
    callback.current = func
  }, [func])

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      callback.current()
    }, delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current)
  }, [])

  useEffect(() => clear, [clear])

  return [run, clear]
}

export default useTimeoutFn
