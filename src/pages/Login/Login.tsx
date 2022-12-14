import React from 'react'
import { ReactComponent as PresentBox } from '@assets/present_box.svg'
import GoogleButton from './GoogleButton'
import KakaoButton from './KakaoButton'

export default function Login() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-primary-2 px-5">
      <div className="flex h-full flex-col items-center justify-center">
        <PresentBox aria-label="present-box-icon" />
        <h1 className="mt-10 text-center text-2xl font-bold leading-[150%] text-grey-1">
          나만의 추억을 공유하고
          <br />
          모두의 추억을 레코드해요!
        </h1>
      </div>
      <div className="mb-20 flex w-full flex-col items-center gap-2">
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  )
}
