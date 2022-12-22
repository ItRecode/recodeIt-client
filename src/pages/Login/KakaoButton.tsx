import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

export default function KakaoButton() {
  return (
    <button
      aria-label="kakao-login-button"
      className="flex h-12 w-85 items-center rounded-xl border-none bg-kakao px-8 font-semibold hover:cursor-pointer"
    >
      <KakaoSymbol aria-label="kakao-symbol-icon" />
      <p className="w-full text-kakao-label">카카오로 계속하기</p>
    </button>
  )
}
