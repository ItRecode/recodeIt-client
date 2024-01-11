import React from 'react'
import { ReactComponent as Gift } from '@assets/record_icons/gift.svg'

export default function RankingItemNoData() {
  return (
    <div className="flex w-full px-6">
      <div className="flex aspect-square w-12 items-center justify-center rounded-full bg-primary-4">
        <Gift width={36} height={36} />
      </div>
      <div className="flex grow flex-col items-center justify-center py-1.5">
        <p className="text-sm font-semibold leading-none">아직 랭킹이 없어요</p>
        <p className="mt-1 text-xs font-normal leading-normal">
          조금만 기다리면 확인할 수 있어요
        </p>
      </div>
    </div>
  )
}
