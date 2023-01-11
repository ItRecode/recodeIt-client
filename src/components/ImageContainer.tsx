import React from 'react'

import recordIcons from '@assets/record_icons'
import { ReactComponent as Left_Arrow_icon } from '@assets/ImageContainer/left_Arrow.svg'
import { ReactComponent as Right_Arrow_icon } from '@assets/ImageContainer/right_Arrow.svg'
import { useImageSwipe } from '@hooks/useImageSwipe'

interface Iprops {
  background_color: string
  icon_name: string
  image_urls: string[]
}
export default function ImageContainer({
  background_color,
  icon_name,
  image_urls,
}: Iprops) {
  const { haveNext, havePrev, next, prev, imageState } =
    useImageSwipe(image_urls)
  const RecordIcon = recordIcons[`${icon_name}`]

  return (
    <div
      className={`${background_color} relative my-4 flex aspect-square w-full items-center justify-center rounded-2xl`}
    >
      {imageState === 0 && icon_name !== '' && (
        <RecordIcon width={160} height={160} />
      )}
      {haveNext && (
        <button
          onClick={next}
          className="absolute right-4 cursor-pointer bg-transparent"
        >
          <Right_Arrow_icon />
        </button>
      )}
      {havePrev && (
        <button
          onClick={prev}
          className="absolute left-4 cursor-pointer bg-transparent"
        >
          <Left_Arrow_icon />
        </button>
      )}
      {imageState !== 0 && (
        <img
          src={image_urls[imageState - 1]}
          className="h-full w-full rounded-2xl"
        />
      )}
    </div>
  )
}
