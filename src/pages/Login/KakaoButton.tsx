import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

export default function KakaoButton() {
  return (
    <button
      className="bg-kakao flex items-center rounded-xl h-12 px-8 font-semibold
        w-85 border-none hover:cursor-pointer"
    >
      <KakaoSymbol aria-label="kakao-symbol-icon" />
      <p className="w-full text-kakao-label">카카오로 계속하기</p>
    </button>
  )
}
