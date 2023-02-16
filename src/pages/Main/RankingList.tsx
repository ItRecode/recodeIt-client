import React, { useEffect, useState } from 'react'
import { IRankingRecordData } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { ReactComponent as Arrow } from '@assets/ranking_btn_arrow.svg'
import { ReactComponent as DownArrow } from '@assets/ranking_down_arrow.svg'
import { useNavigate } from 'react-router-dom'
import { parentCategoryID } from 'types/category'
import { CELEBRATION_ID } from '@assets/constant/constant'

export default function RankingList({
  rankingData,
  parentCategoryId,
}: {
  rankingData: IRankingRecordData[] | undefined
  parentCategoryId: parentCategoryID
}) {
  const navigate = useNavigate()

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
        const ColorName = `bg-${item.colorName}`
        const RecordIcon = recordIcons[`${item.iconName}`]
        return (
          <div
            key={item.recordId}
            className="mb-5 flex h-12 w-full items-center justify-between px-6"
          >
            <div className="flex items-center justify-center">
              <p>{index + 1}</p>
              <div
                className={`${ColorName} ml-4 flex aspect-square w-12 items-center justify-center rounded-full`}
              >
                <RecordIcon width={36} height={36} />
              </div>
              <div className="ml-2">
                <p className="text-base font-semibold">{item.title}</p>
                <div className="flex text-xs">
                  <p className="text-grey-9">{item.writer}</p>
                  <p className="ml-1.5 text-primary-2">+{item.numOfComment}</p>
                </div>
              </div>
            </div>

            <button
              className="flex cursor-pointer items-center bg-transparent"
              onClick={() => navigate(`/record/${item.recordId}`)}
            >
              <p>
                함께 {parentCategoryId === CELEBRATION_ID ? '축하' : '위로'}하기
              </p>
              <Arrow className="ml-4" />
            </button>
          </div>
        )
      })}
      {rankingState !== 2 && (
        <button
          className="flex w-full cursor-pointer items-center justify-center border-t border-grey-3 bg-transparent p-4 text-primary-2"
          onClick={() => {
            if (rankingState !== 2) setRankingState((prev) => prev + 1)
          }}
        >
          <p>더보기</p>
          <DownArrow />
        </button>
      )}
    </div>
  )
}
