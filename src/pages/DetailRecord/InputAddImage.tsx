import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as Camera } from '@assets/camera.svg'
import { ReactComponent as Plus } from '@assets/plus.svg'
import { RECORD_DETAIL_INPUT_IMAGE_HEIGHT } from '@assets/constant/constant'
import { checkFileSize } from '@utils/fileSize'

interface AddImageType {
  image: string
  setImage: Dispatch<SetStateAction<string>>
  setImageFile: Dispatch<SetStateAction<File | null>>
  setInputSectionHeight: Dispatch<SetStateAction<number>>
  setIsOpenToast: Dispatch<SetStateAction<boolean>>
}

export default function InputAddImage({
  image,
  setImage,
  setImageFile,
  setInputSectionHeight,
  setIsOpenToast,
}: AddImageType) {
  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkFileSize(e, () => setIsOpenToast(true))) {
      return
    }

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

  return (
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
  )
}
