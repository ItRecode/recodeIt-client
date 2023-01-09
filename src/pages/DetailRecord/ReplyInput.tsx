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

export default function ReplyInput({
  setInputSectionHeight,
}: {
  setInputSectionHeight: Dispatch<SetStateAction<number>>
}) {
  const [image, setImage] = useState<string | null>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    encodeFileToBase64((e.target.files as FileList)[0])
    setImage(() => e.target.value)
    setInputSectionHeight((prev) => prev + RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
  }

  const handleDeleteImageFile = () => {
    setImage(() => null)
    setInputSectionHeight((prev) => prev - RECORD_DETAIL_INPUT_IMAGE_HEIGHT)
  }

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        try {
          setImage(reader.result as string | null)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })
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

  return (
    <div className="flex w-full items-end bg-grey-1">
      <div className="w-[90%] rounded-lg bg-grey-2 py-4 px-3">
        {image !== null && (
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
          {image === null ? (
            <Plus className="absolute right-0.5 top-[5px]" />
          ) : (
            ''
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
    </div>
  )
}
