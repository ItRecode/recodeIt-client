import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

const { REACT_APP_KAKAO_OAUTH_URL, REACT_APP_REST_API_KEY } = process.env
const KAKAO_AUTH_URL = `${REACT_APP_KAKAO_OAUTH_URL}/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${window.location.origin}/login&response_type=code`

export default function KakaoButton() {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <button
      aria-label="kakao-login-button"
      className="flex h-12 w-85 items-center rounded-xl border-none bg-kakao px-8 font-semibold hover:cursor-pointer"
      onClick={handleKakaoLogin}
    >
      <KakaoSymbol aria-label="kakao-symbol-icon" />
      <p className="w-full text-kakao-label">카카오로 계속하기</p>
    </button>
  )
}
