import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen justify-center min-[450px]:bg-primary-9">
      <div className="h-full w-[350px] max-w-[450px] bg-grey-1">{children}</div>
    </div>
  )
}
