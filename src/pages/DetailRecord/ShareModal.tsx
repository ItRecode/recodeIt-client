import React, { Dispatch, SetStateAction } from 'react'
import { ReactComponent as Closed_icon } from '@assets/icon_closed.svg'
import { ReactComponent as Kakao_icon } from '@assets/kakao.svg'
import { ReactComponent as Arrow_icon } from '@assets/right_purple_arrow.svg'
import { copyLink, ShareKakao } from '@apis/share'
import recordIcons from '@assets/record_icons'

interface IModalProps {
  setShareStatus: Dispatch<SetStateAction<boolean>>
  recordId: number
  title: string
  description: string
  imageUrl?: string
  backgroundColor: string
  iconName: string
}

export default function ShareModal({
  setShareStatus,
  recordId,
  title,
  description,
  imageUrl,
  backgroundColor,
  iconName,
}: IModalProps) {
  const RecordIcon = recordIcons[`${iconName}`]
  return (
    <section className="z-20 h-[187px] w-[270px] rounded-2xl bg-grey-1 py-4 px-3">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">공유하기</p>
        <button
          className="cursor-pointer bg-grey-1"
          onClick={() => setShareStatus(false)}
        >
          <Closed_icon />
        </button>
      </div>
      <div className="mt-4">
        <button
          className="flex w-full cursor-pointer items-center bg-grey-1"
          onClick={() => copyLink(recordId)}
        >
          <div
            className={`${backgroundColor} flex h-12 w-12 items-center justify-center rounded-full`}
          >
            <RecordIcon width={36} height={36} />
          </div>
          <div className="ml-3 w-[68%]">
            <div className="flex justify-between text-left text-[18px] font-semibold">
              URL 공유하기
              <div>
                <Arrow_icon />
              </div>
            </div>
            <p className="text-left text-[12px] text-grey-8">https://...</p>
          </div>
        </button>
        <button
          className="mt-[7px] flex w-full cursor-pointer items-center bg-grey-1"
          onClick={() => ShareKakao({ recordId, title, description, imageUrl })}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kakao">
            <Kakao_icon />
          </div>
          <div className="ml-3 w-[68%]">
            <div className="flex justify-between text-left text-[18px] font-semibold">
              카카오톡 공유하기
              <div>
                <Arrow_icon />
              </div>
            </div>
            <p className="text-left text-[12px] text-grey-8">https://...</p>
          </div>
        </button>
      </div>
    </section>
  )
}
