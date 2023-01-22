import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { ReactComponent as Camera } from '@assets/camera.svg'
import { ReactComponent as Plus } from '@assets/plus.svg'
import { ReactComponent as Close } from '@assets/icon_closed.svg'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import {
  RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA,
  RECORD_DETAIL_INPUT_IMAGE_HEIGHT,
} from '@assets/constant/constant'
import { createReply } from '@apis/reply'
import Alert from '@components/Alert'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@react-query/hooks/useUser'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { DetailPageInputMode } from '@store/atom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ReplyInput({
  setInputSectionHeight,
  recordIdParams,
}: {
  setInputSectionHeight: Dispatch<SetStateAction<number>>
  recordIdParams: string | undefined
}) {
  const queryClient = useQueryClient()

  const [image, setImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [text, setText] = useState('')

  const textRef = useRef<HTMLTextAreaElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const [isCheckedUser, setIsCheckedUser] = useState(false)
  const [isAnonymousUser, setIsAnonymousUser] = useState(false)

  const navigate = useNavigate()

  const { user, isLoading } = useUser()

  const inputMode = useRecoilValue(DetailPageInputMode)

  const resetInputMode = useResetRecoilState(DetailPageInputMode)

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    encodeFile((e.target.files as FileList)[0])

    setImage(e.target.value)
    setImageFile((e.target.files as FileList)[0])

    setInputSectionHeight((prev) => prev + RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
    e.target.value = ''
  }

  const encodeFile = (fileBlob: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        try {
          setImage(reader.result as string)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  const handleDeleteImageFile = () => {
    setImage('')
    setImageFile(null)
    setInputSectionHeight((prev) => prev - RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
  }

  const handleResizeHeight = useCallback(() => {
    if (textRef.current !== null) {
      textRef.current.style.height = 'auto'
      textRef.current.style.height = textRef.current.scrollHeight + 'px'
      setInputSectionHeight(
        RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA +
          textRef.current.scrollHeight
      )
    }
  }, [])

  const handleSubmitReplyData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setText('')
    setImage('')

    const writeCommentRequestDto = {
      recordId: recordIdParams,
      comment: text,
      parentId: inputMode.parentId,
    }

    const data = new FormData()

    if (imageFile !== null) {
      data.set('attachment', imageFile as Blob, (imageFile as File).name)
    }
    data.set(
      'writeCommentRequestDto',
      new Blob([JSON.stringify(writeCommentRequestDto)], {
        type: 'application/json',
      })
    )

    if (inputMode.mode === 'reply') {
      replyMutate(data)
    }
    if (inputMode.mode === 'nestedReply') {
      nestedReplyMutate(data)
    }
    resetInputMode()
  }

  const { mutate: replyMutate } = useMutation(createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getReplyData', recordIdParams])
    },
  })

  const { mutate: nestedReplyMutate } = useMutation(createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getReplyData', recordIdParams])
      queryClient.invalidateQueries(['getNestedReplyData', recordIdParams])
    },
  })

  const handleInputFocus = () => {
    if (!user) {
      setIsCheckedUser(true)
    }
  }

  const handleCancelSingUp = () => {
    setIsCheckedUser(false)
    setIsAnonymousUser(true)
  }

  useEffect(() => {
    if (inputMode.mode === 'nestedReply') {
      textRef.current?.focus()
    }
  }, [inputMode.mode])

  useEffect(() => {
    if (isAnonymousUser) {
      textRef.current?.focus()
    }
  }, [isAnonymousUser])
  return (
    <form
      className="flex w-full items-end bg-transparent py-4 pl-4 pr-6"
      encType="multipart/form-data"
      onSubmit={handleSubmitReplyData}
    >
      <label htmlFor="imageFile">
        <div className="relative mr-2.5 mb-3 h-9 w-9 cursor-pointer bg-transparent">
          <Camera className="absolute top-[7px] right-[5px]" />
          {image === '' && <Plus className="absolute right-0.5 top-[5px]" />}
        </div>
        <input
          onChange={handleSelectImageFile}
          id="imageFile"
          type="file"
          accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
          className="hidden"
        />
      </label>
      <div className=" w-full rounded-lg bg-grey-2 py-4 px-3">
        {image !== '' && (
          <div className="relative mb-2.5 aspect-square w-[60px] rounded-2xl">
            <img
              className="aspect-square w-full rounded-2xl object-cover"
              src={image}
              alt="user-selected-record-image"
            />
            <Close
              className="absolute top-1.5 right-1.5 cursor-pointer"
              onClick={handleDeleteImageFile}
            />
          </div>
        )}

        <div className="flex w-full items-end justify-center">
          <textarea
            ref={textRef}
            rows={1}
            maxLength={100}
            required={true}
            placeholder={
              inputMode.mode === 'reply'
                ? '따뜻한 마음을 남겨주세요. (100자 이내)'
                : '답글 추가... (100자 이내)'
            }
            onInput={handleResizeHeight}
            onChange={(e) => setText(e.target.value)}
            value={text}
            className={`h-auto w-[85%] resize-none bg-inherit text-[14px] leading-normal placeholder:text-grey-5 focus:outline-0`}
            onFocus={handleInputFocus}
            disabled={isLoading}
          />
          <button
            ref={submitButtonRef}
            disabled={text === ''}
            className={`mb-1 cursor-pointer text-xs ${
              text !== '' ? 'text-primary-2' : 'text-grey-6'
            }`}
          >
            완료
          </button>
        </div>
      </div>

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
          subMessage={<>회원가입하고 추억을 공유해보세요.</>}
          cancelMessage="괜찮아요"
          confirmMessage="회원가입"
          onClose={() => setIsCheckedUser(false)}
          onCancel={handleCancelSingUp}
          onConfirm={() => {
            resetInputMode
            navigate('/login')
          }}
        />
      )}
    </form>
  )
}
