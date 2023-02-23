import React, { useEffect, useState } from 'react'
import { IRankingRecordData } from 'types/recordData'
import { ReactComponent as DownArrow } from '@assets/ranking_down_arrow.svg'
import { parentCategoryID } from 'types/category'
import RankingItem from '@components/RankingItem'
import RankingItemNoData from '@components/RankingItemNoData'

export default function RankingList({
  rankingData,
  parentCategoryId,
}: {
  rankingData: IRankingRecordData[] | undefined
  parentCategoryId: parentCategoryID
}) {
  const [rankingState, setRankingState] = useState<number>(0)
  const [rankingList, setRankingList] = useState<IRankingRecordData[]>()
  const [plusBtnState, setPlusBtnState] = useState(false)

  useEffect(() => {
    if (rankingData !== undefined) {
      if (rankingState === 0) {
        setRankingList(rankingData?.slice(0, 3))
        if (rankingData.length > 3) setPlusBtnState(true)
      } else if (rankingState === 1) {
        setRankingList(rankingData?.slice(0, 6))
        if (rankingData.length <= 6) setPlusBtnState(false)
      } else {
        setRankingList(rankingData)
        setPlusBtnState(false)
      }
    }
  }, [rankingState, rankingData])

  useEffect(() => {
    if (rankingList?.length === 0) setPlusBtnState(false)
  }, [rankingList])
  return (
    <div className="mt-8">
      {rankingList?.length !== 0 ? (
        rankingList?.map((item, index) => {
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
        })
      ) : (
        <RankingItemNoData />
      )}
      {plusBtnState && (
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
