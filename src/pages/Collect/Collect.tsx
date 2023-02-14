import { useStorage } from '@react-query/hooks/useStorage'
import React from 'react'
import RecentRecord from './RecentRecord'

export default function Collect() {
  useStorage('sessionStorage')
  return (
    <div className="relative flex flex-col ">
      <div className="h-[1000px] bg-primary-6">1</div>
      <RecentRecord />
    </div>
  )
}
