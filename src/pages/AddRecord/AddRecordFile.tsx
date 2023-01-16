import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Camera from '@assets/camera.svg'
import { ReactComponent as DeleteIcon } from '@assets/deleteIcon.svg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props {
  currentRecordType: string
  setFiles: Dispatch<SetStateAction<File[]>>
  files: File[]
}

function AddRecordFile({ currentRecordType, setFiles, files }: Props) {
  const [currentImg, setCurrentImg] = useState<string[]>([])
  const MAX_FILE = 3

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    encodeFileToBase64((e.target.files as FileList)[0])
    setFiles([...files, (e.target.files as FileList)[0]])
    e.target.value = ''
  }

  useEffect(() => {
    setCurrentImg([])
  }, [currentRecordType])

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        try {
          setCurrentImg([...currentImg, reader.result as string])
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  const handleDelete = (toDeleteIndex: number): void => {
    setCurrentImg(filterArray(currentImg, toDeleteIndex))
    setFiles(filterArray(files, toDeleteIndex))
  }

  function filterArray<T>(array: Array<T>, toDeleteIndex: number): T[] {
    return array.filter((value, index) => {
      if (index !== toDeleteIndex) {
        return value
      }
    })
  }

  return (
    <div className="mb-8 flex items-center gap-2">
      <label className="h-[66px] w-[66px]" htmlFor="file">
        <div className="mr-4  flex h-[66px] w-[66px] flex-col items-center justify-center  rounded-2xl border-2 border-dashed border-grey-4 py-3 px-5">
          <img className=" mb-1" src={Camera} alt="camera" />
          <p className=" text-xs text-grey-4">
            <span
              className={`${!currentImg ? 'text-grey-4' : 'text-primary-2'}`}
            >
              {currentImg.length}
            </span>
            {`/${MAX_FILE}`}
          </p>
        </div>
      </label>
      <input
        disabled={currentImg.length === 3}
        onChange={handleSelectImageFile}
        className="hidden"
        id="file"
        type={'file'}
        accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
      />
      {currentImg.length > 0 &&
        currentImg.map((imgSrc, index) => {
          return (
            <div key={index} className="relative h-[66px] w-[66px]">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src={imgSrc}
                alt="user-selected-record-image"
              />
              <DeleteIcon
                onClick={() => handleDelete(index)}
                className=" absolute top-[6px] right-[6px] cursor-pointer"
              />
            </div>
          )
        })}
    </div>
  )
}

export default AddRecordFile
