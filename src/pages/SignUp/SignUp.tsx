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
  const [checkedNickname, setCheckedNickname] = useState(false)
  const [property, setProperty] = useState<PropertyType>('default')
  const { values, errors, handleRemove, handleChange, handleSubmit } = useForm({
    initialValues: { nickname: '' },
    onSubmit: ({ nickname }) => {
      if (!checkedNickname) {
        //닉네임 중복 확인 =>성공
        // nickname.trim()
        setCheckedNickname(true)
      }

      // 회원가입 로직 작성
    },
    validate: ({ nickname }) => {
      const error: { nickname?: string } = {}
      const spacePattern = /\s/g
      const nicknamePattern = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]$/

      if (nickname.match(spacePattern)) {
        error.nickname = '공백을 제거해주세요'
      }

      if (nickname.match(nicknamePattern)) {
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

  const handleRemoveNickname = (isRemove: boolean) => {
    if (isRemove) {
      handleRemove('nickname')
    }
  }

  return (
    <div className="px-6">
      <h1 className="my-32">
        <span className="text-primary-2">레코딧</span>에서 어떤 닉네임을
        <br />
        사용하시겠어요?
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          property={'error'}
          label="닉네임"
          value={values.nickname}
          name="nickname"
          placeholder="국문, 영문, 숫자 포함 2~8자"
          message={errors.nickname as string}
          maxLength={8}
          onChange={handleChange}
          onRemove={handleRemoveNickname}
        />
        <div className="mt-[72px] flex flex-col items-center gap-2">
          <Button active={!checkedNickname}>중복 확인</Button>
          <Button property="solid" active={checkedNickname}>
            레코딧 입장
          </Button>
        </div>
      </form>
    </div>
  )
}
