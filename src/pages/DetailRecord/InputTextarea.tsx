import { RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA } from '@assets/constant/constant'
import Alert from '@components/Alert'
import { useUser } from '@react-query/hooks/useUser'
import { DetailPageInputMode } from '@store/detailPageAtom'
import { LocalStorage } from '@utils/localStorage'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'

interface InputTextareaProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>
  text: string
  setText: Dispatch<SetStateAction<string>>
  setInputSectionHeight: Dispatch<SetStateAction<number>>
  recordIdParams?: string
}
export default function InputTextarea({
  textareaRef,
  text,
  setText,
  setInputSectionHeight,
  recordIdParams,
}: InputTextareaProps) {
  const screenAvailWidth = window.screen.availWidth

  useEffect(() => {
    if (screenAvailWidth > 340) {
      setInputPlaceholder('따뜻한 마음을 남겨주세요. (100자 이내)')
    }
  }, [])

  const navigate = useNavigate()
  const inputMode = useRecoilValue(DetailPageInputMode)
  const resetInputMode = useResetRecoilState(DetailPageInputMode)

  const { user, isLoading } = useUser()
  const [inputPlaceholder, setInputPlaceholder] =
    useState('따뜻한 마음을 남겨주세요')

  const handleInputFocus = () => {
    if (!user) {
      setIsCheckedUser(true)
    }
  }

  const [isCheckedUser, setIsCheckedUser] = useState(false)
  const [isAnonymousUser, setIsAnonymousUser] = useState(false)

  const handleCancelSingUp = () => {
    setIsCheckedUser(false)
    setIsAnonymousUser(true)
  }

  const handleConfirmSignUp = () => {
    LocalStorage.set('redirectUrl', `/record/${recordIdParams}`)
    resetInputMode()
    navigate('/login')
  }

  useEffect(() => {
    if (inputMode.mode === 'nestedReply' && !user) {
      setIsCheckedUser(true)
    }
  }, [inputMode.mode])

  useEffect(() => {
    if (isAnonymousUser === true) {
      textareaRef.current?.focus()
    }
  }, [isAnonymousUser])

  const handleResizeHeight = useCallback(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
      setInputSectionHeight(
        RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA +
          textareaRef.current.scrollHeight
      )
    }
  }, [])
  return (
    <>
      <textarea
        ref={textareaRef}
        rows={1}
        maxLength={100}
        required={true}
        placeholder={
          inputMode.mode === 'reply'
            ? inputPlaceholder
            : '답글 추가... (100자 이내)'
        }
        onInput={handleResizeHeight}
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={`h-auto w-[85%] resize-none bg-inherit text-[14px] leading-normal placeholder:text-grey-5 focus:outline-0`}
        onFocus={handleInputFocus}
        disabled={isLoading}
      />

      {isCheckedUser && (
        <Alert
          visible={isCheckedUser && !isAnonymousUser}
          mainMessage={
            <>
              비회원은 댓글을
              <br />
              <span className="text-sub-1">수정, 삭제</span> 할 수 없어요
            </>
          }
          subMessage={<>로그인하고 추억을 공유해보세요.</>}
          cancelMessage="괜찮아요"
          confirmMessage="로그인"
          onClose={() => setIsCheckedUser(false)}
          onCancel={handleCancelSingUp}
          onConfirm={handleConfirmSignUp}
        />
      )}
    </>
  )
}
