import { MutableRefObject, useState } from 'react'

const useSwipe = (ref: MutableRefObject<HTMLElement>) => {
  const [isDragging, setIsDragging] = useState(false)
  let pos = { top: 0, left: 0, x: 0, y: 0 }

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    pos = {
      left: ref.current.scrollLeft,
      top: ref.current.scrollTop,
      x: e.clientX,
      y: e.clientY,
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      setIsDragging(true)
    }
    const dx = e.clientX - pos.x
    const dy = e.clientY - pos.y

    ref.current.scrollTop = pos.top - dy
    ref.current.scrollLeft = pos.left - dx

    ref.current.style.cursor = 'grabbing'
    ref.current.style.userSelect = 'none'
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      e.stopPropagation()
      setIsDragging(false)
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    ref.current.style.cursor = 'pointer'
    ref.current.style.removeProperty('user-select')
  }

  return { handleMouseDown, isDragging, setIsDragging }
}

export default useSwipe
