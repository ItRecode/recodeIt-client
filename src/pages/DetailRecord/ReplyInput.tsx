import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { ReactComponent as Camera } from '@assets/camera.svg'
import { ReactComponent as Plus } from '@assets/plus.svg'
import { ReactComponent as Close } from '@assets/icon_closed.svg'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import {
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
  RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA,
  RECORD_DETAIL_INPUT_IMAGE_HEIGHT,
  RECORD_DETAIL_INPUT_TEXTAREAT_INITIAL_HEIGHT,
} from '@assets/constant/constant'
import { createReply, updateComment } from '@apis/reply'
import Alert from '@components/Alert'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@react-query/hooks/useUser'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  DetailPageInputMode,
  modifyComment,
  nestedReplyState,
} from '@store/atom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LocalStorage } from '@utils/localStorage'
import { ReactComponent as CloseIcon } from '@assets/detail_page_icon/Close.svg'

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

  const [isCheckedUser, setIsCheckedUser] = useState(false)
  const [isAnonymousUser, setIsAnonymousUser] = useState(false)

  const navigate = useNavigate()

  const { user, isLoading } = useUser()

  const inputMode = useRecoilValue(DetailPageInputMode)
  const updateReply = useRecoilValue(modifyComment)
  const resetUpdateReply = useResetRecoilState(modifyComment)
  const [deleteImageUrl, setDeleteImageUrl] = useState<string[]>([])

  const resetInputMode = useResetRecoilState(DetailPageInputMode)
  const setNestedReplyList = useSetRecoilState(nestedReplyState)

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
    if (inputMode.mode === 'update') {
      if (image.slice(60, 63) === 'dev') {
        setDeleteImageUrl(() => [image.slice(64)])
      } else {
        setDeleteImageUrl(() => [image.slice(65)])
      }
    }
    setInputSectionHeight((prev) => prev - RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
    setImage('')
    setImageFile(null)
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
    setImageFile(null)

    if (inputMode.mode === 'nestedReply') {
      setNestedReplyList({ commentId: +inputMode.parentId, state: true })
    }
    if (textRef.current !== null) {
      textRef.current.style.height =
        RECORD_DETAIL_INPUT_TEXTAREAT_INITIAL_HEIGHT + 'px'
    }
    setInputSectionHeight(RECORD_DETAIL_INITIAL_INPUT_HEIGHT)

    const data = new FormData()

    if (imageFile !== null) {
      data.set('attachment', imageFile as Blob, (imageFile as File).name)
    }

    if (inputMode.mode !== 'update') {
      const writeCommentRequestDto = {
        recordId: recordIdParams,
        comment: text,
        parentId: inputMode.parentId,
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
    }

    if (inputMode.mode === 'update') {
      const modifyCommentRequestDto = {
        comment: text,
        deleteImages: deleteImageUrl,
      }
      data.set(
        'modifyCommentRequestDto',
        new Blob([JSON.stringify(modifyCommentRequestDto)], {
          type: 'application/json',
        })
      )
      updateReplyMutate({ data, commentId: updateReply.commentId })
      resetUpdateReply
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
      queryClient.invalidateQueries([
        'getNestedReplyData',
        recordIdParams,
        inputMode.parentId,
      ])
    },
  })

  const { mutate: updateReplyMutate } = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getReplyData', recordIdParams])
      queryClient.invalidateQueries([
        'getNestedReplyData',
        recordIdParams,
        inputMode.parentId,
      ])
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

  const handleConfirmSignUp = () => {
    LocalStorage.set('redirectUrl', `/record/${recordIdParams}`)
    resetInputMode()
    navigate('/login')
  }

  useEffect(() => {
    if (inputMode.mode === 'nestedReply') {
      textRef.current?.focus()
    }
    if (inputMode.mode === 'update') {
      setText(updateReply.content)
      setImage(updateReply.imageUrl)
    }
  }, [inputMode.mode])

  useEffect(() => {
    if (isAnonymousUser) {
      textRef.current?.focus()
    }
  }, [isAnonymousUser])

  return (
    <>
      {(inputMode.mode === 'nestedReply' || inputMode.mode === 'update') && (
        <div className="flex h-[48px] w-full items-center justify-between bg-grey-2 py-2 px-4">
          <p className="text-xs text-grey-6">
            {inputMode.mode === 'nestedReply' ? '답글 작성중...' : '수정중...'}
          </p>
          <button
            onClick={() => {
              resetInputMode()
              setText('')
              setImage('')
              setImageFile(null)
            }}
            className="cursor-pointer p-0"
          >
            <CloseIcon />
          </button>
        </div>
      )}
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
            disabled={image !== ''}
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
            onConfirm={handleConfirmSignUp}
          />
        )}
      </form>
    </>
  )
}
