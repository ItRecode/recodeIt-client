import React, { useEffect, useState } from 'react'
import { IRankingRecordData } from 'types/recordData'
import { ReactComponent as DownArrow } from '@assets/ranking_down_arrow.svg'
import { parentCategoryID } from 'types/category'
import RankingItem from '@components/RankingItem'

export default function RankingList({
  rankingData,
  parentCategoryId,
}: {
  rankingData: IRankingRecordData[] | undefined
  parentCategoryId: parentCategoryID
}) {
  const [rankingState, setRankingState] = useState<number>(0)
  const [rakingList, setRankingList] = useState<IRankingRecordData[]>()

  useEffect(() => {
    if (rankingState === 0) {
      setRankingList(rankingData?.slice(0, 3))
    } else if (rankingState === 1) {
      setRankingList(rankingData?.slice(0, 6))
    } else {
      setRankingList(rankingData)
    }
  }, [rankingState, rankingData])

  return (
    <div className="mt-8">
      {rakingList?.map((item, index) => {
        const colorName = `bg-${item.colorName}`
        return (
          <RankingItem
            key={item.recordId}
            index={index + 1}
            parentCategoryId={parentCategoryId}
            recordId={item.recordId}
            colorName={colorName}
            title={item.title}
            writer={item.writer}
            numOfComment={item.numOfComment}
            iconName={item.iconName}
          />
        )
      })}
      {rankingState < 2 && (
        <button
          className="flex w-full cursor-pointer items-center justify-center border-t border-grey-3 bg-transparent p-4 text-primary-2"
          onClick={() => {
            if (rankingState < 2) setRankingState((prev) => prev + 1)
          }}
        >
          <p>더보기</p>
          <DownArrow />
        </button>
      )}
    </div>
  )
}
