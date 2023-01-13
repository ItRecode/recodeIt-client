import { useEffect, useRef } from 'react'

const events = ['mousedown', 'touchstart']

const useClickAway = <T extends HTMLElement>(handler: (e: Event) => void) => {
  // 파라미터로 받는 것 : 바깥 부분을 클릭했을 때 실행 되는 이벤트
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleEvent = (e: Event) => {
      // 이벤틑 타켓이 해당 엘리먼트에 포함되어 있는지
      // 포함되어 있지 않으면 이벤트를 실행
      !element.contains(e.target as Node) && handler(e)
    }

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent)
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent)
      }
    }
  }, [ref, handler])

  return ref
}

export default useClickAway
