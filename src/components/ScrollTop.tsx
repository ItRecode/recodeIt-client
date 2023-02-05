import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollTop({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
