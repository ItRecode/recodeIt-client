import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen justify-center web:bg-primary-9">
      <div className="h-full max-w-[450px] bg-grey-1 scrollbar-thin hover:scrollbar-track-grey-2 hover:scrollbar-thumb-primary-6 active:scrollbar-track-grey-2 active:scrollbar-thumb-primary-6 web:w-[375px] basic:w-[375px] small:w-screen">
        {children}
      </div>
    </div>
  )
}
