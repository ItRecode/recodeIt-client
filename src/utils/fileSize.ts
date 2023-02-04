const MAX_FILE_SIZE = 5

export const getByteSize = (size: number) => {
  return size / 1000 / 1000
}

export const checkFileSize = (
  e: React.ChangeEvent<HTMLInputElement>,
  callbackFn: () => void
) => {
  let isOver5MB = false
  const files = e.target.files as FileList
  const getSize = () => {
    for (let i = 0; i < files.length; i++) {
      const convertedSize = getByteSize(files[i].size)
      if (convertedSize > MAX_FILE_SIZE) {
        callbackFn()
        isOver5MB = true
        break
      }
    }
  }
  ;[].forEach.call(e.target.files, getSize)
  return isOver5MB
}
