import React from 'react'

import recordIcons from '@assets/record_icons'
import { ReactComponent as Left_Arrow_icon } from '@assets/ImageContainer/left_Arrow.svg'
import { ReactComponent as Right_Arrow_icon } from '@assets/ImageContainer/right_Arrow.svg'
import { useImageSwipe } from '@hooks/useImageSwipe'

interface Iprops {
  background_color: string
  iconName: string
  imageUrls: string[]
}
export default function ImageContainer({
  background_color,
  iconName,
  imageUrls,
}: Iprops) {
  const { haveNext, havePrev, next, prev, imageState } =
    useImageSwipe(imageUrls)
  const RecordIcon = recordIcons[`${iconName}`]

  return (
    <div className="relative my-4 flex aspect-square w-full items-center">
      <div
        className={`${background_color} absolute flex aspect-square w-full items-center justify-center rounded-2xl`}
      >
        {imageState === 0 && iconName !== '' && (
          <RecordIcon width={160} height={160} />
        )}
      </div>
      {imageState !== 0 && (
        <div className="absolute aspect-square w-full overflow-hidden rounded-2xl">
          <img
            src={imageUrls[imageState - 1]}
            alt={`img-${imageState}`}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {haveNext && imageUrls?.length !== 0 && (
        <button
          onClick={next}
          className="absolute right-4 cursor-pointer bg-transparent p-0"
        >
          <Right_Arrow_icon />
        </button>
      )}
      {havePrev && (
        <button
          onClick={prev}
          className="absolute left-4 cursor-pointer bg-transparent p-0"
        >
          <Left_Arrow_icon />
        </button>
      )}
    </div>
  )
}
