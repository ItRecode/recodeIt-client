import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { ReactComponent as Close } from '@assets/icon_closed.svg'
import { useState } from 'react'
import { useRef } from 'react'
import {
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
  RECORD_DETAIL_INPUT_IMAGE_HEIGHT,
  RECORD_DETAIL_INPUT_TEXTAREAT_INITIAL_HEIGHT,
} from '@assets/constant/constant'
import { createReply, updateComment } from '@apis/reply'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { scrollTarget } from '@store/atom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import InputSnackBar from './InputSnackBar'
import InputAddImage from './InputAddImage'
import InputTextarea from './InputTextarea'
import {
  DetailPageInputMode,
  modifyComment,
  nestedReplyState,
} from '@store/detailPageAtom'
import Toast from '@components/Toast'

export default function ReplyInput({
  setInputSectionHeight,
  recordIdParams,
}: {
  setInputSectionHeight: Dispatch<SetStateAction<number>>
  recordIdParams: string | undefined
}) {
  const queryClient = useQueryClient()

  const [isOpenToast, setIsOpenToast] = useState(false)

  const [image, setImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteImageUrl, setDeleteImageUrl] = useState<string[]>([])

  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const inputMode = useRecoilValue(DetailPageInputMode)
  const resetInputMode = useResetRecoilState(DetailPageInputMode)

  const updateReply = useRecoilValue(modifyComment)
  const resetUpdateReply = useResetRecoilState(modifyComment)

  const setNestedReplyList = useSetRecoilState(nestedReplyState)

  const setScrollTargetId = useSetRecoilState(scrollTarget)

  const getDeleteImageFileId = () => {
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

  const handleSubmitReplyData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputMode.mode === 'nestedReply') {
      setNestedReplyList({ commentId: +inputMode.parentId, state: true })
    }
    if (textareaRef.current !== null) {
      textareaRef.current.style.height =
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
        comment: text.replaceAll(/(\n|\r\n)/g, '<br>'),
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
        setNestedReplyList({ state: true, commentId: +inputMode.parentId })
      }
    }

    if (inputMode.mode === 'update') {
      const modifyCommentRequestDto = {
        comment: text.replaceAll(/(\n|\r\n)/g, '<br>'),
        deleteImages: deleteImageUrl,
      }
      data.set(
        'modifyCommentRequestDto',
        new Blob([JSON.stringify(modifyCommentRequestDto)], {
          type: 'application/json',
        })
      )
      updateReplyMutate({ data: data, commentId: updateReply.commentId })
      resetUpdateReply
    }
    setText('')
    setImage('')
    setImageFile(null)
    resetInputMode()
  }

  const { mutate: replyMutate } = useMutation(createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getReplyData', recordIdParams])
      setScrollTargetId((prev) => {
        return { ...prev, scrollReset: true }
      })
    },
    onError: () => {
      alert('댓글 작성에 실패했습니다.')
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
      setScrollTargetId((prev) => {
        return { ...prev, commentId: inputMode.parentId as number }
      })
    },
    onError: () => {
      alert('답글 작성에 실패했습니다.')
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
    onError: () => {
      alert('수정에 실패했습니다.')
    },
  })

  useEffect(() => {
    if (updateReply.commentId !== 0) setText(updateReply.content)
  }, [updateReply])

  return (
    <>
      {isOpenToast && (
        <Toast
          visible={true}
          timeLimit={2}
          message={
            <>
              5MB 이상은 {<br />}
              첨부할 수 없습니다.
            </>
          }
          onClose={() => setIsOpenToast(false)}
        />
      )}
      <InputSnackBar
        setText={setText}
        setImage={setImage}
        setImageFile={setImageFile}
      />
      <form
        className="flex w-full items-end bg-transparent py-4 pl-4 pr-6"
        encType="multipart/form-data"
        onSubmit={handleSubmitReplyData}
      >
        <InputAddImage
          image={image}
          setImage={setImage}
          setImageFile={setImageFile}
          setInputSectionHeight={setInputSectionHeight}
          setIsOpenToast={setIsOpenToast}
        />
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
                onClick={getDeleteImageFileId}
              />
            </div>
          )}

          <div className="flex w-full items-end justify-center">
            <InputTextarea
              textareaRef={textareaRef}
              text={text}
              setText={setText}
              setInputSectionHeight={setInputSectionHeight}
              recordIdParams={recordIdParams}
            />
            <button
              disabled={text === ''}
              className={`mb-1 cursor-pointer  whitespace-nowrap bg-transparent text-xs ${
                text !== '' ? 'text-primary-2' : 'text-grey-6'
              }`}
            >
              완료
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
