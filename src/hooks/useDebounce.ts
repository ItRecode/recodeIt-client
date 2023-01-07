import { useEffect } from 'react'
import useTimeoutFunc from './useTimeoutFunc'

const useDebounce = <T>(func: () => void, delay: number, deps: Array<T>) => {
  const [run, clear] = useTimeoutFunc(func, delay)

  useEffect(run, deps)

  return clear
}

export default useDebounce
