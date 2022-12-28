import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

const { REACT_APP_KAKAO_OAUTH_URL, REACT_APP_KAKAO_REST_API_KEY } = process.env
const KAKAO_AUTH_URL = `${REACT_APP_KAKAO_OAUTH_URL}/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/login/KAKAO&response_type=code`

export default function KakaoButton() {
  const handleKakaoLogin = () => {
    try {
      window.location.replace(KAKAO_AUTH_URL)
    } catch (e) {
      alert('카카오 인증에 실패하였습니다. 다시 시도해주세요')
    }
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
