import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'
import { useAuth } from '@react-query/hooks/useAuth'
import { getIsDuplicatedNickname } from '@apis/auth'
import useDebounce from '@hooks/useDebounce'

export default function SignUp() {
  const location = useLocation()
  const navigate = useNavigate()
  const { oauthSignUp } = useAuth()
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!location.state?.tempSessionId) {
      navigate('/login')
    }
  }, [])

  useDebounce(
    async () => {
      setErrorMessage('')
      setIsCheckedNickname(false)
      if (nickname.length > 0 && validateNickname(nickname)) {
        try {
          await getIsDuplicatedNickname(nickname)
          setIsCheckedNickname(true)
        } catch (e) {
          setErrorMessage('이미 사용중이거나 사용할 수 없는 닉네임입니다.')
          setIsCheckedNickname(false)
        }
      }
    },
    300,
    [nickname]
  )

  const validateNickname = (nickname: string) => {
    const spacePattern = /\s/g
    const nicknamePattern = /[가-힣aA-z0-9]/

    if (nickname.length < 2) {
      setErrorMessage('2글자 이상 입력해주세요')
      return false
    }

    if (nickname.match(spacePattern)) {
      setErrorMessage('공백을 제거해주세요')
      return false
    }

    if (!nickname.match(nicknamePattern)) {
      setErrorMessage('이미 사용중이거나 사용할 수 없는 닉네임입니다.')
      return false
    }
    return true
  }

  const setPropertyWithIsCheckedNickname = () => {
    if (isCheckedNickname) return 'success'
    if (errorMessage.length > 0 && !isCheckedNickname) return 'error'
    return 'default'
  }

  const handleRemoveNickname = (isRemove: boolean) => {
    if (isRemove && !isCheckedNickname) {
      setNickname('')
      setIsCheckedNickname(false)
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
      <Input
        property={setPropertyWithIsCheckedNickname()}
        name="nickname"
        label="닉네임"
        value={nickname}
        maxLength={8}
        placeholder="국문, 영문, 숫자 포함 2~8자"
        message={isCheckedNickname ? '사용가능한 닉네임입니다.' : errorMessage}
        onChange={(e) => setNickname(e.target.value)}
        onRemove={handleRemoveNickname}
      />
      <div className="mt-[104px]">
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
