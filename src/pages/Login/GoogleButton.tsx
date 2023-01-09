import React from 'react'
import { ReactComponent as GoogleSymbol } from '@assets/google.svg'

const { REACT_APP_GOOGLE_OAUTH_URL, REACT_APP_GOOGLE_CLIENT_ID } = process.env
const GOOGLE_AUTH_URL = `${REACT_APP_GOOGLE_OAUTH_URL}/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}/login/GOOGLE&response_type=code&scope=profile`

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    try {
      window.location.replace(GOOGLE_AUTH_URL)
    } catch (e) {
      alert('현재 구글 로그인이 불가합니다. 나중에 다시 시도해주세요')
    }
  }

  return (
    <button
      aria-label="google-login-button"
      className="flex h-12 w-full items-center rounded-xl border-none bg-grey-1 px-8 font-semibold hover:cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <GoogleSymbol aria-label="google-symbol-icon" />
      <p className="w-full text-kakao-label">Google로 계속하기</p>
    </button>
  )
}
