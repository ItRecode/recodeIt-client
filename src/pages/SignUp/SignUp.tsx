import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import Input from '@components/Input'
import { useAuth } from '@react-query/hooks/useAuth'
import { getIsDuplicatedNickname } from '@apis/auth'
import useDebounce from '@hooks/useDebounce'
import { NICKNAME_MAX_LENGTH } from '@assets/constant/constant'
import { getIsValidateNickname } from '@utils/getIsValidateNickname'

export default function SignUp() {
  const location = useLocation()
  const navigate = useNavigate()
  const { oauthSignUp, isLoading } = useAuth()
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isInputClicked, setIsInputClicked] = useState(false)

  useEffect(() => {
    if (!location.state?.tempSessionId) {
      navigate('/login')
    }
  }, [])

  useDebounce(
    async () => {
      setErrorMessage('')
      setIsCheckedNickname(false)
      if (
        nickname.length > 0 &&
        getIsValidateNickname(nickname, setErrorMessage)
      ) {
        try {
          await getIsDuplicatedNickname(nickname)
          setIsCheckedNickname(true)
        } catch (e) {
          setErrorMessage('이미 사용중인 닉네임이에요.')
          setIsCheckedNickname(false)
        }
      }
    },
    300,
    [nickname]
  )

  const setPropertyWithIsCheckedNickname = () => {
    if (nickname.length < 1 && !isInputClicked) return 'default'
    if (errorMessage.length > 0 && !isCheckedNickname) return 'error'
    return 'success'
  }

  const handleRemoveNickname = () => {
    setNickname('')
    setIsCheckedNickname(false)
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
      <div className="h-[105px]">
        <Input
          property={setPropertyWithIsCheckedNickname()}
          name="nickname"
          label="닉네임"
          value={nickname}
          maxLength={NICKNAME_MAX_LENGTH}
          placeholder={isInputClicked ? '' : `국문, 영문, 숫자 포함 2~8자`}
          message={
            isCheckedNickname ? '사용 가능한 닉네임입니다.' : errorMessage
          }
          onChange={(e) => setNickname(e.target.value)}
          onRemove={handleRemoveNickname}
          onFocus={() => setIsInputClicked(true)}
          onBlur={() => setIsInputClicked(false)}
          autoFocus={false}
        />
      </div>
      <div className="mt-[104px]">
        <Button
          type="submit"
          property="solid"
          active={isCheckedNickname}
          onClick={handleSignUp}
          loading={isLoading}
          disabled={isLoading}
        >
          레코딧 입장
        </Button>
      </div>
    </div>
  )
}
