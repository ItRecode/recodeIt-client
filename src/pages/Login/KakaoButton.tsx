import React from 'react'
import { ReactComponent as KakaoSymbol } from '@assets/kakao.svg'

const { REACT_APP_KAKAO_OAUTH_URL, REACT_APP_KAKAO_REST_API_KEY } = process.env
const KAKAO_AUTH_URL = `${REACT_APP_KAKAO_OAUTH_URL}/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/login/KAKAO&response_type=code`

export default function KakaoButton() {
  const handleKakaoLogin = () => {
    try {
      window.location.replace(KAKAO_AUTH_URL)
    } catch (e) {
      alert('현재 카카오 로그인이 불가합니다. 나중에 다시 시도해주세요')
    }
  }

  return (
    <button
      aria-label="kakao-login-button"
      className="flex h-12 w-full items-center rounded-md border-none bg-kakao px-5 text-sm font-semibold text-grey-10 hover:cursor-pointer"
      onClick={handleKakaoLogin}
    >
      <KakaoSymbol
        aria-label="kakao-symbol-icon"
        className="h-[18px] w-[18px]"
      />
      <p className="w-full text-grey-10">카카오 로그인</p>
    </button>
  )
}
