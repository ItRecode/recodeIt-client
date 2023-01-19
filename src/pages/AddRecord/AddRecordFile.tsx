import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Camera from '@assets/camera.svg'
import { ReactComponent as DeleteIcon } from '@assets/deleteIcon.svg'
import Toast from '@components/Toast'

interface Props {
  currentRecordType: string
  setFiles: Dispatch<SetStateAction<File[]>>
  files: File[]
}

function AddRecordFile({ currentRecordType, setFiles, files }: Props) {
  const [currentImg, setCurrentImg] = useState<string[]>([])
  const [isToast, setIsToast] = useState(false)
  const MAX_FILE = 3

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files !== null &&
      currentImg.length + e.target.files?.length > MAX_FILE
    ) {
      return setIsToast(true)
    }
    encodeFileToBase64(e.target.files as FileList)
    // FileList가 이터러블하지 않으나 유사배열이라서 Array를 빌려서 ...메소드를 사용함
    setFiles([...files, ...Array.from(e.target.files as FileList)])
    e.target.value = ''
  }

  useEffect(() => {
    setCurrentImg([])
  }, [currentRecordType])

  const encodeFileToBase64 = (fileBlob: FileList) => {
    const readAndPreview = (file: File) => {
      const reader = new FileReader()
      reader.onload = () =>
        setCurrentImg((prev) => [...prev, reader.result as string])
      reader.readAsDataURL(file)
    }
    if (fileBlob) {
      // 빈배열로 forEach 돌리니까 eslint때문에 세미콜론이 계속 생성되서 설정했습니다.
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;[].forEach.call(fileBlob, readAndPreview)
    }
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
      {isToast && (
        <Toast
          visible={true}
          message={
            <>
              사진은 최대 3장까지
              <br />
              선택 가능합니다
            </>
          }
          onClose={() => setIsToast(false)}
        />
      )}
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
        multiple
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
