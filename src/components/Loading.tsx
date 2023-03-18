import React from 'react'
import Spinner from './Spinner'

const Loading = React.memo(function LoadingComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Spinner size="large" />
      <h3 className="mt-8 text-base font-medium">로딩 중 이에요</h3>
      <p className="mt-3 text-xs">잠시만 기다려 주세요</p>
    </div>
  )
})

export default Loading
