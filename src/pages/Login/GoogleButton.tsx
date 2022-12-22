import React from 'react'
import { ReactComponent as GoogleSymbol } from '@assets/google.svg'

export default function GoogleButton() {
  return (
    <button
      aria-label="google-login-button"
      className="flex items-center h-12 px-8 font-semibold border-none w-85 rounded-xl bg-grey-1 hover:cursor-pointer"
    >
      <GoogleSymbol aria-label="google-symbol-icon" />
      <p className="w-full text-kakao-label">Google로 계속하기</p>
    </button>
  )
}
