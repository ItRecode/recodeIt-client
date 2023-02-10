import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchRecord() {
  const { state } = useLocation()
  const [keyword, setKeyword] = useState(state || '')

  return <div>{keyword}</div>
}
