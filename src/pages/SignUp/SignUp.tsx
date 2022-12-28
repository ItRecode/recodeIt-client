import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'

type SingUpUserInfo = {
  tempId: null | string
  nickname: string
}

export default function SignUp() {
  const location = useLocation()
  const [userInfo, setUserInfo] = useState<SingUpUserInfo>({
    tempId: null,
    nickname: '',
  })

  useEffect(() => {
    if (location.state.tempSessionId) {
      setUserInfo({
        ...userInfo,
        tempId: location.state.tempSessionId,
      })
    }
  }, [])

  return (
    <div className="px-6">
      <h1 className="my-32">
        <span className="text-primary-2">레코딧</span>에서 어떤 닉네임을
        <br />
        사용하시겠어요?
      </h1>
      <Input
        label="닉네임"
        name="nickname"
        placeholder="국문, 영문, 숫자 포함 3~8자"
        message="사용가능한 닉네임이에요"
      />
      <div className="mt-[72px] flex flex-col items-center gap-2">
        <Button active={false}>중복 확인</Button>
        <Button property="solid" active={false}>
          레코딧 입장
        </Button>
      </div>
    </div>
  )
}
