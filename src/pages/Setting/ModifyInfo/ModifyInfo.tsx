import React, { useRef, useState } from 'react'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { updateUserInfo } from '@apis/user'
import useDebounce from '@hooks/useDebounce'
import BackButton from '@components/BackButton'
import { getIsValidateNickname } from '@utils/getIsValidateNickname'
import { NICKNAME_MAX_LENGTH } from '@assets/constant/constant'
import Button from '@components/Button'
import { useLocation, useNavigate } from 'react-router-dom'

function ModifyInfo() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState(state.nickname || '')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputBorderStyle, setInputBorderStyle] = useState('')

  useDebounce(
    async () => {
      setErrorMessage('')
      setInputBorderStyle('')
      setIsCheckedNickname(false)
      if (getIsValidateNickname(nickname, setErrorMessage)) {
        if (nickname.length > 0) {
          try {
            setIsCheckedNickname(true)
            setInputBorderStyle('border border-solid border-primary-2')
          } catch (e) {
            setErrorMessage('이미 사용중인 닉네임이에요.')
            setIsCheckedNickname(false)
            setInputBorderStyle('border border-solid border-sub-1')
          }
        }
      } else {
        setInputBorderStyle('border border-solid border-sub-1')
      }
    },
    300,
    [nickname]
  )

  const handleClickUpdateButton = async () => {
    try {
      await updateUserInfo(nickname)
      navigate('/setting')
    } catch (e) {
      setIsCheckedNickname(false)
    }
  }

  return (
    <div className="relative h-screen w-full">
      <section id="route-backIcon-button" className="ml-[18px] mt-4">
        <BackButton />
      </section>
      <section id="modify-info-nickname" className="relative mt-11 px-6">
        <p className="font-medium">닉네임</p>
        <div className="relative mt-[9px] flex w-full items-center">
          <input
            ref={inputRef}
            id="modify-nickname-input"
            value={nickname}
            className={`w-full rounded-[8px] bg-grey-2 py-[17px] pl-[12px] text-[14px] font-medium placeholder:text-grey-5 focus:outline-none
              ${inputBorderStyle}`}
            autoComplete="off"
            onChange={(e) => setNickname(e.target.value)}
            maxLength={NICKNAME_MAX_LENGTH}
            autoFocus
          />
          <CloseIcon
            className="absolute right-[10px] cursor-pointer"
            onClick={() => {
              setNickname('')
              inputRef.current?.focus()
            }}
          />
        </div>
        <p
          className={`pt-3 text-sm ${
            isCheckedNickname ? 'text-primary-2' : 'text-sub-1'
          }`}
        >
          {isCheckedNickname ? '사용 가능한 닉네임이에요.' : errorMessage}
        </p>
      </section>
      <div className="relative mt-[104px] px-6">
        <Button
          type="submit"
          property="solid"
          active={isCheckedNickname}
          onClick={handleClickUpdateButton}
          disabled={!isCheckedNickname}
        >
          수정 완료
        </Button>
      </div>
    </div>
  )
}

export default ModifyInfo
