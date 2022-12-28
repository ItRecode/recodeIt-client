import React from 'react'
import { Navigate } from 'react-router-dom'

interface RouteProps {
  children: React.ReactElement
  isPublic: boolean
}

const ProtectedRoute = ({ children, isPublic }: RouteProps) => {
  const validation = isPublic
  if (!validation) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
