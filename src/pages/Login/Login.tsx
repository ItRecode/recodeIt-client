import React, { useEffect } from 'react'
import { ReactComponent as Firecracker } from '@assets/firecracker.svg'
import GoogleButton from './GoogleButton'
import KakaoButton from './KakaoButton'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const location = useLocation()
  const code = location.search.split('=')[1]

  useEffect(() => {
    if (code) {
      //TODO: 백엔드와 API 통신
    }
  }, [])

  return (
    <div className="flex h-full flex-col items-center bg-primary-2">
      <div className="flex h-full flex-col items-center justify-center">
        <Firecracker aria-label="firecracker-icon" />
        <h1 className="mt-10 leading-[150%] text-grey-1">
          나만의 추억을 공유하고
          <br />
          모두의 추억을 레코드해요!
        </h1>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KakaoButton />
        <GoogleButton />
        <p className="mt-5 mb-10 text-xs text-grey-1 underline hover:cursor-pointer">
          이메일로 회원가입
        </p>
      </div>
    </div>
  )
}
