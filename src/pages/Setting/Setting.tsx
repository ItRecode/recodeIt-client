import React from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Setting() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/notservice')
  }, [])
  return <div>Setting</div>
}
