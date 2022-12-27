import BackButton from '@components/BackButton'
import MoreButton from '@components/MoreButton'
import React from 'react'

export default function DetailRecord() {
  return (
    <div>
      <header className="h-[60px]" />
      <nav className="flex justify-between px-6">
        <BackButton />
        <MoreButton />
      </nav>
    </div>
  )
}
