import React, { useRef, useState } from 'react'
import { ReactComponent as CloseIcon } from '@assets/icon_closed.svg'
import { updateUserInfo } from '@apis/user'
import useDebounce from '@hooks/useDebounce'
import BackButton from '@components/BackButton'
import { useUser } from '@react-query/hooks/useUser'
import { getIsValidateNickname } from '@utils/getIsValidateNickname'
import { NICKNAME_MAX_LENGTH } from '@assets/constant/constant'
import Button from '@components/Button'
import { useCheckMobile } from '@hooks/useCheckMobile'

function ModifyInfo() {
  const { user } = useUser()
  const { isMobile } = useCheckMobile()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isCheckedNickname, setIsCheckedNickname] = useState(false)
  const [nickname, setNickname] = useState(user?.data)
  const [errorMessage, setErrorMessage] = useState('')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useDebounce(
    async () => {
      setErrorMessage('')
      setIsCheckedNickname(false)
      if (
        nickname.length > 0 &&
        getIsValidateNickname(nickname, setErrorMessage)
      ) {
        try {
          // await updateUserInfo(nickname)
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
              ${
                nickname.length === 0
                  ? 'border-none'
                  : isCheckedNickname
                  ? 'border border-solid border-primary-2'
                  : 'border border-sub-1 outline-primary-2'
              }`}
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
      {isMobile && isKeyboardOpen ? (
        <div className="fixed bottom-0 left-0 w-full">
          <Button
            type="submit"
            property="solid"
            active={isCheckedNickname}
            // onClick={handleSignUp}
            // loading={isLoading}
            // disabled={isLoading}
            onFocus={() => setIsKeyboardOpen(true)}
            onBlur={() => setIsKeyboardOpen(false)}
          >
            수정 완료
          </Button>
        </div>
      ) : (
        <div className="relative mt-[104px] px-6">
          <Button
            type="submit"
            property="solid"
            active={isCheckedNickname}
            // onClick={handleSignUp}
            // loading={isLoading}
            // disabled={isLoading}
          >
            수정 완료
          </Button>
        </div>
      )}
    </div>
  )
}

export default ModifyInfo
