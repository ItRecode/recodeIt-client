import React from 'react'
import { Navigate } from 'react-router-dom'

interface RouteProps {
  children: React.ReactElement
  isPublic: boolean
}

const ProtectedRoute = ({ children, isPublic }: RouteProps) => {
  const getCookie = (name: string): string | null => {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return value ? value[2] : null
  }

  const SESSION = 'SESSION'
  const validation = isPublic || getCookie(SESSION)

  if (!validation) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
