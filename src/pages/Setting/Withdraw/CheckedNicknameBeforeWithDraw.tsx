import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NICKNAME_MAX_LENGTH } from '@assets/constant/constant'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { ReactComponent as Back } from '@assets/back.svg'
import useDebounce from '@hooks/useDebounce'
import Button from '@components/Button'
import Alert from '@components/Alert'

export default function CheckedNicknameBeforeWithDraw() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [inputBorderStyle, setInputBorderStyle] = useState('')
  const [isFocusInput, setIsFocusInput] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  useDebounce(
    async () => {
      setMessage('')
      setInputBorderStyle('')
      setIsCheckedNickname(false)
      if (nickname.length > 0) {
        if (state.nickname === nickname) {
          setIsCheckedNickname(true)
          setInputBorderStyle('border border-solid border-grey-10')
        } else {
          setMessage('닉네임이 일치하지 않아요.')
          setInputBorderStyle('border border-solid border-sub-1')
          setIsCheckedNickname(false)
        }
      }
    },
    300,
    [nickname]
  )

  return (
    <>
      <section id="route-backIcon-button" className="ml-[18px] mt-4">
        <Back
          className="cursor-pointer"
          onClick={() => navigate('/setting', { replace: true })}
        />
      </section>
      <section
        id="checked-nickname-before-withdraw-info"
        className="mt-11 px-6"
      >
        <h1 className="text-[20px] font-medium leading-[30px]">
          계속 탈퇴를 진행하시려면
          <br />
          닉네임을 입력해 확인해주세요
        </h1>
        <div className="mt-10 h-[70px]">
          <p className="font-medium">닉네임</p>
          <div className="relative mt-[9px] flex w-full items-center">
            <input
              ref={inputRef}
              id="modify-nickname-input"
              value={nickname}
              placeholder={isFocusInput || !state ? '' : state.nickname}
              className={`w-full rounded-[8px] bg-grey-2 py-[17px] pl-[12px] text-[14px] font-medium placeholder:text-grey-5 focus:outline-none
              ${inputBorderStyle}`}
              autoComplete="off"
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setIsFocusInput(true)}
              onBlur={() => setIsFocusInput(false)}
              maxLength={NICKNAME_MAX_LENGTH}
            />
            <CloseIcon
              className="absolute right-[10px] cursor-pointer"
              onClick={() => {
                setNickname('')
                inputRef.current?.focus()
              }}
            />
          </div>
          {nickname.length > 0 && (
            <p
              className={`pt-3 text-sm ${
                isCheckedNickname ? 'text-grey-10' : 'text-sub-1'
              }`}
            >
              {isCheckedNickname ? '닉네임이 일치해요.' : message}
            </p>
          )}
        </div>
        <div className="mt-[104px] w-full">
          <Button
            property="danger"
            type="submit"
            active={isCheckedNickname}
            disabled={!isCheckedNickname}
            onClick={() => setAlertOpen(true)}
          >
            탈퇴하기
          </Button>
        </div>
      </section>
      <Alert
        visible={alertOpen}
        mainMessage={
          <>
            {nickname}님, <br /> 탈퇴하신다니 너무 아쉬워요
          </>
        }
        subMessage={
          <>
            탈퇴 후 <span className="text-sub-1">1주일 간</span>
            <br /> 재가입이 불가능해요.
          </>
        }
        confirmMessage="예"
        cancelMessage="아니오"
        onConfirm={() => setAlertOpen(false)}
        onClose={() => setAlertOpen(false)}
        onCancel={() => setAlertOpen(false)}
      />
    </>
  )
}
