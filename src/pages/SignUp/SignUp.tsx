import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'
import useForm from '@hooks/useForm'
import { useGetDuplicateNickname } from '@react-query/hooks/useNickname'

type PropertyType = 'default' | 'success' | 'error'

export default function SignUp() {
  const location = useLocation()
  const [nickname, setNickname] = useState('')
  const [checkedNickname, setCheckedNickname] = useState(false)
  const [property, setProperty] = useState<PropertyType>('default')

  const { values, errors, handleRemove, handleChange, handleSubmit } = useForm({
    initialValues: { nickname: '' },
    onSubmit: ({ nickname }) => {
      setNickname(nickname)
      if (!checkedNickname) {
        if (isSuccess) {
          setCheckedNickname(true)
        }
      }
    },
    validate: ({ nickname }) => {
      const error: { nickname?: string } = {}
      const spacePattern = /\s/g
      const nicknamePattern = /^.{2,8}$/

      if (nickname.match(spacePattern)) {
        error.nickname = '공백을 제거해주세요'
      }

      if (!nickname.match(nicknamePattern)) {
        error.nickname = '국문, 영문, 숫자로 이루어진 2~8자로 입력해주세요'
      }

      return error
    },
  })
  const { isSuccess } = useGetDuplicateNickname(nickname, checkedNickname)

  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state.tempSessionId) {
      navigate('/login')
    }
  }, [])

  const setPropertyWithCheckedNickname = () => {
    if (checkedNickname) return 'success'
    if (errors.nickname as string) return 'error'
    return 'default'
  }

  const handleRemoveNickname = (isRemove: boolean) => {
    if (isRemove && !checkedNickname) {
      handleRemove('nickname')
    }
  }

  return (
    <div className="px-6">
      <h1 className="my-32 text-2xl font-semibold">
        <span className="text-primary-2">레코딧</span>에서 어떤 닉네임을
        <br />
        사용하시겠어요?
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          property={setPropertyWithCheckedNickname()}
          name="nickname"
          label="닉네임"
          value={values.nickname}
          maxLength={8}
          placeholder="국문, 영문, 숫자 포함 2~8자"
          disabled={checkedNickname}
          message={
            checkedNickname
              ? '사용가능한 닉네임입니다.'
              : (errors.nickname as string)
          }
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
