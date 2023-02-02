import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import Camera from '@assets/camera.svg'
import { ReactComponent as DeleteIcon } from '@assets/deleteIcon.svg'
import Toast from '@components/Toast'
import { useRecoilValue } from 'recoil'
import { recordTypeAtom } from '@store/atom'

interface Props {
  setFiles: Dispatch<SetStateAction<File[]>>
  files: File[]
  recordFiles: string[]
  isModify: boolean
  toDeleteFiles: string[]
  setToDeleteFiles: Dispatch<SetStateAction<string[]>>
}

function AddRecordFile({
  setFiles,
  files,
  recordFiles,
  isModify,
  toDeleteFiles,
  setToDeleteFiles,
}: Props) {
  const [currentImg, setCurrentImg] = useState<string[]>([])
  const [isToast, setIsToast] = useState(false)
  const [toastType, setToastType] = useState<'fileSize' | 'maxFile' | null>(
    null
  )
  const currentRecordType = useRecoilValue(recordTypeAtom)
  const MAX_FILE = 3
  const MAX_FILE_SIZE = 5

  const getByteSize = (size: number) => {
    return size / 1000 / 1000
  }

  const checkFileSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isOver5MB = false
    const files = e.target.files as FileList
    const getSize = () => {
      for (let i = 0; i < files.length; i++) {
        const convertedSize = getByteSize(files[i].size)
        if (convertedSize > MAX_FILE_SIZE) {
          setIsToast(true)
          setToastType('fileSize')
          isOver5MB = true
          break
        }
      }
    }
    ;[].forEach.call(e.target.files, getSize)
    return isOver5MB
  }

  const checkMaxFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isMaxFile = false
    if (
      e.target.files !== null &&
      currentImg.length + e.target.files?.length > MAX_FILE
    ) {
      setToastType('maxFile')
      setIsToast(true)
      isMaxFile = true
    }
    return isMaxFile
  }

  const handleSelectImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedMaxFile: boolean = checkMaxFile(e)
    if (checkedMaxFile) {
      return (e.target.value = '')
    }
    const checkedFileSize: boolean = checkFileSize(e)
    if (checkedFileSize) {
      return (e.target.value = '')
    }

    encodeFileToBase64(e.target.files as FileList)
    // encodeFileToBase64(e.target.files as FileList)
    // FileList가 이터러블하지 않으나 유사배열이라서 Array를 빌려서 ...메소드를 사용함
    setFiles([...files, ...Array.from(e.target.files as FileList)])
    e.target.value = ''
  }

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

  useEffect(() => {
    setCurrentImg([])
    if (recordFiles) {
      setCurrentImg(recordFiles)
    }
  }, [currentRecordType])

  const handleDelete = (toDeleteIndex: number): void => {
    setCurrentImg(filterArray(currentImg, toDeleteIndex))
    setFiles(filterArray(files, toDeleteIndex))

    if (isModify && recordFiles.includes(currentImg[toDeleteIndex])) {
      setToDeleteFiles([
        ...toDeleteFiles,
        recordFiles[toDeleteIndex + toDeleteFiles.length].split('/')[4],
      ])
    }
  }

  function filterArray<T>(array: Array<T>, toDeleteIndex: number): T[] {
    return array.filter((value, index) => {
      if (index !== toDeleteIndex) {
        return value
      }
    })
  }

  const makeToast = (): ReactNode => {
    return (
      <Toast
        visible={true}
        timeLimit={2}
        message={
          <>
            {toastType === 'maxFile' ? (
              <>
                사진은 최대 3장까지
                <br />
                선택 가능합니다
              </>
            ) : (
              <>
                5MB 이상은 {<br />}
                첨부할 수 없습니다.
              </>
            )}
          </>
        }
        onClose={() => setIsToast(false)}
      />
    )
  }

  return (
    <div className="mb-8 flex items-center gap-2">
      {isToast && makeToast()}
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
        disabled={currentImg.length === MAX_FILE}
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
