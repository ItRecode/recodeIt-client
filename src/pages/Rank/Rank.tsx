import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Rank() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/notservice', { replace: true })
  }, [])
  return <div>Rank</div>
}
