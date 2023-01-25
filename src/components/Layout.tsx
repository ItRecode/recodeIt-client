import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen justify-center bg-grey-2">
      <div className="relative h-full w-full max-w-[420px] overflow-y-scroll bg-grey-1">
        {children}
      </div>
    </div>
  )
}
