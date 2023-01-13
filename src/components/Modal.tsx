import useClickAway from '@hooks/useClickOutside'
import React, { ReactNode, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface IModalProps {
  visible: boolean
  children: ReactNode
  onClose?: () => void
}

export default function Modal({
  visible = false,
  children,
  onClose,
  ...props
}: IModalProps) {
  const modalRef = useClickAway<HTMLDivElement>(() => {
    onClose && onClose()
  })

  const modalElement = useMemo(() => document.createElement('modal'), [])

  useEffect(() => {
    document.body.appendChild(modalElement)
    return () => {
      document.body.removeChild(modalElement)
    }
  })

  return createPortal(
    <div
      className={
        visible ? 'fixed top-0 left-0 z-50 block h-full w-screen' : 'hidden'
      }
    >
      <div className="absolute h-full w-screen bg-grey-10 opacity-50" />
      <div
        ref={modalRef}
        {...props}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grey-1"
      >
        {children}
      </div>
    </div>,
    modalElement
  )
}
