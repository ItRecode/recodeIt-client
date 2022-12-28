import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'
import useForm from '@hooks/useForm'

type PropertyType = 'default' | 'success' | 'error'

export default function SignUp() {
  const location = useLocation()
  const [tempId, setTempId] = useState<null | string>(null)
  const [property, setProperty] = useState<PropertyType>('default')
  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      nickname: '',
    },
    onSubmit: ({ nickname }) => {
      // console.log(nickname)
      // 닉네임 중복 확인
      // nickname.trim()
    },
    validate: ({ nickname }) => {
      console.log(nickname)

      const error: { nickname?: string } = {}
      const spacePattern = /\s/g
      const nicknamePattern = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{2,8}$/

      if (!nickname.match(spacePattern)) {
        error.nickname = '공백을 제거해주세요'
      }

      if (nicknamePattern.test(nickname)) {
        error.nickname = '국문, 영문, 숫자 포함 2~8자로 입력해주세요'
      }

      return error
    },
  })

  useEffect(() => {
    if (location.state.tempSessionId) {
      const tempSessionId = location.state.tempSessionId
      setTempId(tempSessionId)
    }
  }, [])

  return (
    <div className="px-6">
      <h1 className="my-32">
        <span className="text-primary-2">레코딧</span>에서 어떤 닉네임을
        <br />
        사용하시겠어요?
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          property={property}
          label="닉네임"
          name="nickname"
          placeholder="국문, 영문, 숫자 포함 2~8자"
          message={errors.nickname as string}
          maxLength={8}
          onChange={handleChange}
        />
        <div className="mt-[72px] flex flex-col items-center gap-2">
          <Button active={true}>중복 확인</Button>
          <Button property="solid" active={false}>
            레코딧 입장
          </Button>
        </div>
      </form>
    </div>
  )
}
