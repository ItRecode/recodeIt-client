import { CELEBRATION_ID } from '@assets/constant/constant'
import Category from '@components/Category'
import ParentCategoryTab from '@components/ParrentCategoryTab'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { parentCategoryID } from 'types/category'
import { ReactComponent as Collapse } from '@assets/collect_page_icon/collapse.svg'
import { keyOfRankingPeriod, RANKINGPERIOD } from '@assets/constant/ranking'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '@apis/record'
import { IRankingRecordData } from 'types/recordData'
import RankingItem from '@components/RankingItem'
import { ReactComponent as DownArrow } from '@assets/ranking_down_arrow.svg'

export default function CollectRanking({
  setOpenModal,
  rankingPeriod,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  rankingPeriod: keyOfRankingPeriod
}) {
  const [parentCategoryId, setParentCategoryId] =
    useState<parentCategoryID>(CELEBRATION_ID)
  const [choosedCategoryId, setChoosedCategoryId] = useState(CELEBRATION_ID)
  const [rankingData, setRankingData] = useState<IRankingRecordData[]>()
  const [rankingState, setRankingState] = useState(0)
  const [plusBtnState, setPlusBtnState] = useState(false)

  const { data, isSuccess } = useQuery(
    ['ranking', choosedCategoryId, rankingPeriod],
    () => getRanking(choosedCategoryId, rankingPeriod),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (isSuccess) {
      if (rankingState === 0 && data.data.recordRankingDtos.length > 5) {
        setRankingData(data.data.recordRankingDtos.slice(0, 5))
        setPlusBtnState(true)
      } else {
        setRankingData(data.data.recordRankingDtos)
      }
    }
    if (rankingState === 1) {
      setPlusBtnState(false)
    }
  }, [data, isSuccess, rankingPeriod, choosedCategoryId, rankingState])

  return (
    <div className="mt-4 w-full">
      <div className="pl-[26px]">
        <p className="text-sm leading-none">
          총 <span className="text-primary-2">개</span> 의 레코딧
        </p>
        <p className="mt-6 text-2xl font-semibold leading-none">
          많이 레코딧 받고 있어요!
        </p>
      </div>

      <section id="parentCategory" className="mt-[22px]">
        <ParentCategoryTab
          parentCategoryId={parentCategoryId}
          setParentCategoryId={setParentCategoryId}
        />
      </section>

      <section id="category" className="mt-6 pl-6">
        <Category
          slider={true}
          parentCategoryId={parentCategoryId}
          choosedCategoryId={choosedCategoryId}
          setChoosedCategoryId={setChoosedCategoryId}
        />
      </section>
      <section
        id="periodCategory"
        className="mt-4 flex cursor-pointer justify-end px-6"
        onClick={() => setOpenModal(true)}
      >
        <p className="mr-1.5 text-xs leading-6 text-grey-8">
          {RANKINGPERIOD[rankingPeriod]}
        </p>
        <Collapse />
      </section>
      <section id="rankingList" className="mt-8">
        {rankingData &&
          rankingData.map((item, index) => {
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
        {plusBtnState && (
          <button
            className="flex w-full cursor-pointer items-center justify-center border-t border-solid border-grey-3 bg-transparent p-4 text-primary-2"
            onClick={() => {
              if (rankingState < 1) setRankingState((prev) => prev + 1)
            }}
          >
            <p>더보기</p>
            <DownArrow />
          </button>
        )}
      </section>
      <div className="h-[15px] w-full bg-grey-2" />
    </div>
  )
}
