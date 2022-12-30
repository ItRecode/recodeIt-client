import React, { useState } from 'react'
import Camera from '@assets/camera.svg'
import { ReactComponent as DeleteIcon } from '@assets/deleteIcon.svg'

function AddRecordFile() {
  const [currentImg, setCurrentImg] = useState<null | string>(null)

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    encodeFileToBase64((e.target.files as FileList)[0])
    setCurrentImg(e.target.value)
  }

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        try {
          setCurrentImg(reader.result as string | null)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  return (
    <div className="mb-8 flex items-center">
      <label htmlFor="file">
        <div className="mr-4  flex h-[66px] w-[66px] flex-col items-center justify-center  rounded-2xl border-2 border-dashed border-grey-4 py-3 px-5">
          <img className=" mb-1" src={Camera} alt="camera" />
          <p className=" text-xs text-grey-4">
            <span className={`text-${!currentImg ? 'grey-4' : 'primary-2'}`}>
              {!currentImg ? '0' : '1'}
            </span>
            /1
          </p>
        </div>
      </label>
      <input
        disabled={currentImg !== null}
        onChange={handleSelectImageFile}
        className="hidden"
        id="file"
        type={'file'}
        accept="image/gif;capture=camera"
      />
      {currentImg && (
        <div className=" relative h-[66px] w-[66px]">
          <img
            className=" h-full w-full rounded-2xl"
            src={currentImg}
            alt="user-selected-record-image"
          />
          <DeleteIcon
            onClick={() => setCurrentImg(null)}
            className=" absolute top-[6px] right-[6px] cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}

export default AddRecordFile
