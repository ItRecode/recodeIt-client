import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

export default function KakaoButton() {
  return (
    <button
      aria-label="kakao-login-button"
      className="flex items-center h-12 px-8 font-semibold border-none w-85 rounded-xl bg-kakao hover:cursor-pointer"
    >
      <KakaoSymbol aria-label="kakao-symbol-icon" />
      <p className="w-full text-kakao-label">카카오로 계속하기</p>
    </button>
  )
}
