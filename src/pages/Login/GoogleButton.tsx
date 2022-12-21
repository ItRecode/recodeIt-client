import React from 'react'
import { ReactComponent as GoogleSymbol } from '@assets/google.svg'

export default function GoogleButton() {
  return (
    <button
      className="bg-grey-1 flex items-center rounded-xl h-12 px-8 font-semibold
        w-85 border-none hover:cursor-pointer"
    >
      <GoogleSymbol aria-label="google-symbol-icon" />
      <p className="w-full text-kakao-label">Google로 계속하기</p>
    </button>
  )
}
