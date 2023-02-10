import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchRecord() {
  const { state } = useLocation()
  const [keyword, setKeyword] = useState(state || '')

  useEffect(() => {
    setKeyword('')
    // 배포 에러로 우선 넣었습니다. 기능 개발 시 수정 예정
  }, [keyword])

  return <div>{keyword}</div>
}
