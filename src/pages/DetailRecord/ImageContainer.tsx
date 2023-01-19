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
    <div
      className={`${background_color} relative my-4 flex aspect-square w-full items-center justify-center rounded-2xl`}
    >
      {imageState === 0 && iconName !== '' && (
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
          src={imageUrls[imageState - 1]}
          className="aspect-square h-full w-full rounded-2xl object-cover"
        />
      )}
    </div>
  )
}
