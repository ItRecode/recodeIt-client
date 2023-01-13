import React, { Dispatch, SetStateAction } from 'react'
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

export default function ReplyInput({
  setInputSectionHeight,
  recordId,
}: {
  setInputSectionHeight: Dispatch<SetStateAction<number>>
  recordId: number
}) {
  const [image, setImage] = useState<string | undefined>()
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [text, setText] = useState('')
  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    encodeFile((e.target.files as FileList)[0])
    setImage(() => e.target.value)
    setImageFile((e.target.files as FileList)[0])
    setInputSectionHeight((prev) => prev + RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
  }

  const encodeFile = (fileBlob: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        try {
          setImage(reader.result as string | undefined)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  const handleDeleteImageFile = () => {
    setImage(() => undefined)
    setImageFile(() => undefined)
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

  const handleSubmitReplyData = (
    e: React.FormEvent<HTMLFormElement>,
    parentId?: number
  ) => {
    e.preventDefault()

    const writeCommentRequestDto = {
      recordId: recordId,
      comment: (e.target as HTMLInputElement).value,
      parentId: parentId || '',
    }
    const data = new FormData()
    if (imageFile !== undefined) {
      data.set('attachment', imageFile as Blob, imageFile?.name)
    }
    data.set(
      'writeCommentRequestDto',
      new Blob([JSON.stringify(writeCommentRequestDto)], {
        type: 'application/json',
      })
    )
    const submit = async () => {
      await createReply(data)
    }
    submit()
  }

  return (
    <form
      className="flex w-full items-end bg-grey-1"
      encType="multipart/form-data"
      onSubmit={handleSubmitReplyData}
    >
      <div className="w-[90%] rounded-lg bg-grey-2 py-4 px-3">
        {image !== undefined && (
          <div className="relative mb-2.5 aspect-square w-[60px] rounded-2xl">
            <img
              className=" h-full w-full rounded-2xl"
              src={image}
              alt="user-selected-record-image"
            />
            <Close
              className="absolute top-1.5 right-1.5 cursor-pointer"
              onClick={handleDeleteImageFile}
            />
          </div>
        )}
        <div className="flex items-end">
          <textarea
            ref={textRef}
            rows={1}
            maxLength={100}
            required={true}
            placeholder="따뜻한 마음을 남겨주세요"
            onInput={handleResizeHeight}
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="h-auto w-[85%] resize-none bg-inherit text-[14px] placeholder:text-grey-5 focus:outline-0"
          />
          <button className="cursor-pointer text-[12px] text-primary-2">
            확인
          </button>
        </div>
      </div>
      <label htmlFor="imageFile">
        <div className="relative ml-2 mb-2 h-9 w-9 cursor-pointer bg-grey-1">
          <Camera className="absolute top-[7px] right-[5px]" />
          {image === undefined && (
            <Plus className="absolute right-0.5 top-[5px]" />
          )}
        </div>
        <input
          onChange={handleSelectImageFile}
          id="imageFile"
          type="file"
          accept="image/gif;capture=camera"
          className="hidden"
        />
      </label>
    </form>
  )
}
