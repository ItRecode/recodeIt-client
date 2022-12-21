import React from 'react'
import { ReactComponent as Firecracker } from '@assets/firecracker.svg'

import GoogleButton from './GoogleButton'
import KakaoButton from './KakaoButton'

export default function Login() {
  return (
    <div className="h-full bg-primary-2 flex flex-col items-center">
      <div className="h-full flex flex-col justify-center items-center">
        <Firecracker aria-label="firecracker-icon" />
        <h1 className="text-grey-1 leading-[150%] mt-10">
          나만의 추억을 공유하고
          <br />
          모두의 추억을 레코드해요!
        </h1>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <KakaoButton />
        <GoogleButton />
        <p className="text-grey-1 text-xs underline mt-5 mb-10 hover:cursor-pointer">
          이메일로 회원가입
        </p>
      </div>
    </div>
  )
}
