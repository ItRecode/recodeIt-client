import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'
import useForm from '@hooks/useForm'
import { useAuth } from '@react-query/hooks/useAuth'
import { useGetDuplicateNickname } from '@react-query/hooks/useNickname'

export default function SignUp() {
  const location = useLocation()
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState('')
  const { oauthSignUp } = useAuth()
  const navigate = useNavigate()

  const { values, errors, handleRemove, handleChange, handleSubmit } = useForm({
    initialValues: { nickname: '' },
    onSubmit: ({ nickname }) => {
      setIsCheckedNickname(true)
      setNickname(nickname)
    },
    validate: ({ nickname }) => {
      const error: { nickname?: string } = {}
      const spacePattern = /\s/g
      const nicknamePattern = /[가-힣aA-z0-9]{2,8}/

      if (!nickname.match(nicknamePattern)) {
        setIsCheckedNickname(false)
        error.nickname = '이미 사용중이거나 사용할 수 없는 닉네임입니다.'
      }

      if (nickname.match(spacePattern)) {
        setIsCheckedNickname(false)
        error.nickname = '공백을 제거해주세요'
      }

      if (!isDuplicate) {
        setIsCheckedNickname(false)
        error.nickname = '이미 사용중이거나 사용할 수 없는 닉네임입니다.'
      }

      return error
    },
  })
  const { isDuplicate } = useGetDuplicateNickname(values.nickname)

  useEffect(() => {
    if (!location.state?.tempSessionId) {
      navigate('/login')
    }
  }, [])

  const setPropertyWithisCheckedNickname = () => {
    if (isCheckedNickname) return 'success'
    if (errors.nickname as string) return 'error'
    return 'default'
  }

  const handleRemoveNickname = (isRemove: boolean) => {
    if (isRemove && !isCheckedNickname) {
      handleRemove('nickname')
    }
  }

  const handleSignUp = () => {
    const { tempSessionId, loginType } = location.state
    oauthSignUp({ type: loginType, tempId: tempSessionId, nickname })
  }

  return (
    <div className="px-6">
      <h1 className="my-32 text-2xl font-semibold">
        <span className="text-primary-2">레코딧</span>
        에서 어떤 닉네임을
        <br />
        사용하시겠어요?
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          property={setPropertyWithisCheckedNickname()}
          name="nickname"
          label="닉네임"
          value={values.nickname}
          maxLength={8}
          placeholder="국문, 영문, 숫자 포함 2~8자"
          message={
            isCheckedNickname
              ? '사용가능한 닉네임입니다.'
              : (errors.nickname as string)
          }
          onChange={handleChange}
          onRemove={handleRemoveNickname}
        />
        <div className="mt-[72px]">
          <Button type="submit" active={values.nickname.length > 0}>
            중복 확인
          </Button>
        </div>
      </form>
      <div className="mt-2">
        <Button
          type="submit"
          property="solid"
          active={isCheckedNickname}
          onClick={handleSignUp}
        >
          레코딧 입장
        </Button>
      </div>
    </div>
  )
}
