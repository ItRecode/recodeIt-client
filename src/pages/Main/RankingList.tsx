import React, { useEffect, useState } from 'react'
import { IRandomRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'

export default function RankingList({
  rankingData,
}: {
  rankingData: IRandomRecordData[] | undefined
}) {
  const [rankingState, setRankingState] = useState<0 | 1 | 2>(0)
  const [rakingList, setRankingList] = useState<IRandomRecordData[]>()

  useEffect(() => {
    if (rankingState === 0) {
      setRankingList(rankingData?.slice(0, 3))
    } else if (rankingState === 1) {
      setRankingList(rankingData?.slice(0, 6))
    } else {
      setRankingList(rankingData)
    }
  }, [rankingState, rankingData])

  console.log(rakingList)
  return (
    <div>
      {rakingList?.map((item, index) => {
        const RecordIcon = recordIcons[`${item.iconName}`]
        return (
          <div
            key={item.recordId}
            className="flex w-full items-center justify-between px-6"
          >
            <p>{index + 1}</p>
            <div>
              <RecordIcon width={36} height={36} />
            </div>
            <p>{item.title}</p>
            <button>함께 축하하기</button>
          </div>
        )
      })}
      <button>더보기</button>
    </div>
  )
}
