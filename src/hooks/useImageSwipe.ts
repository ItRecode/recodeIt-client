import { useEffect, useState } from 'react'

export const useImageSwipe = (imageUrl: string[]) => {
  const [haveNext, setHaveNext] = useState(false)
  const [havePrev, setHavePrev] = useState(false)
  const [imageState, setImageState] = useState(0)

  const next = () => {
    setImageState((prev) => prev + 1)
  }
  const prev = () => {
    setImageState((prev) => prev - 1)
  }
  console.log(imageState)
  useEffect(() => {
    if (imageUrl[0] !== '') {
      if (imageState === 0) {
        setHaveNext(true)
        setHavePrev(false)
      }
      if (imageState === imageUrl.length) {
        setHaveNext(false)
        setHavePrev(true)
      }
      if (imageState !== 0) setHavePrev(true)
    }
  }, [imageUrl, imageState])

  return { haveNext, havePrev, next, prev, imageState }
}
