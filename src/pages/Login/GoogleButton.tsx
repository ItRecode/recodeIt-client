import React from 'react'
import { ReactComponent as GoogleSymbol } from '@assets/google.svg'

export default function GoogleButton() {
  return (
    <button
      aria-label="google-login-button"
      className="flex h-12 w-85 items-center rounded-xl border-none bg-grey-1 px-8 font-semibold hover:cursor-pointer"
    >
      <GoogleSymbol aria-label="google-symbol-icon" />
      <p className="w-full text-kakao-label">Google로 계속하기</p>
    </button>
  )
}
