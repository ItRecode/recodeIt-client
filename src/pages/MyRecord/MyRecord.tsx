import React from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function MyRecord() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/notservice', {
      replace: true,
    })
  }, [])
  return <div>MyRecord</div>
}
