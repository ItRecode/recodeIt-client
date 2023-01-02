import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen justify-center web:bg-primary-9">
      <div className="h-full max-w-[450px] overflow-y-scroll bg-grey-1 web:w-[375px] basic:w-[375px] small:w-screen">
        {children}
      </div>
    </div>
  )
}
