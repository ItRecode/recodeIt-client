import { MutableRefObject, useCallback, useEffect, useState } from 'react'

const useSwipe = (ref: MutableRefObject<HTMLElement>) => {
  const [drag, setDrag] = useState(false)
  let pos = { top: 0, left: 0, x: 0, y: 0 }

  const handleMouseDown = () => {
    setDrag(true)
  }

  const handleMouseUp = () => {
    setDrag(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!drag) return

      pos = {
        left: ref.current.scrollLeft,
        top: ref.current.scrollTop,
        x: e.clientX,
        y: e.clientY,
      }

      const dx = e.clientX - pos.x
      const dy = e.clientY - pos.y

      ref.current.scrollTop = pos.top - dy
      ref.current.scrollLeft = pos.left - dx
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }, [ref, pos, drag])

  return { handleMouseDown }
}

export default useSwipe
