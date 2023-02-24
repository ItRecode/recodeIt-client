import { CELEBRATION_ID } from '@assets/constant/constant'
import Category from '@components/Category'
import ParentCategoryTab from '@components/ParrentCategoryTab'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { parentCategoryID } from 'types/category'
import { ReactComponent as Collapse } from '@assets/collect_page_icon/collapse.svg'
import { keyOfRankingPeriod, RANKINGPERIOD } from '@assets/constant/ranking'
import { useQuery } from '@tanstack/react-query'
import { getRanking, getTotalRecordCount } from '@apis/record'
import { IRankingRecordData } from 'types/recordData'
import RankingItem from '@components/RankingItem'
import { ReactComponent as DownArrow } from '@assets/ranking_down_arrow.svg'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import {
  parentCategoryIdAtomColletPage,
  subCategoryIdAtomCollectPage,
} from '@store/collectPageAtom'
import { checkFromDetailPage } from '@store/detailPageAtom'
import RankingItemNoData from '@components/RankingItemNoData'

export default function CollectRanking({
  setOpenModal,
  rankingPeriod,
  setRankingPeriod,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  rankingPeriod: keyOfRankingPeriod
  setRankingPeriod: SetterOrUpdater<keyOfRankingPeriod>
}) {
  const [parentCategoryId, setParentCategoryId] =
    useRecoilState<parentCategoryID>(parentCategoryIdAtomColletPage)
  const [choosedCategoryId, setChoosedCategoryId] = useRecoilState(
    subCategoryIdAtomCollectPage
  )
  const [rankingData, setRankingData] = useState<IRankingRecordData[]>()
  const [rankingState, setRankingState] = useState(0)
  const [rankingList, setRankingList] = useState<IRankingRecordData[]>()
  const [plusBtnState, setPlusBtnState] = useState(false)
  const isFromDetailPage = useRecoilValue(checkFromDetailPage)

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

  const { data: totalRecordCount } = useQuery(
    ['totalRecordCount'],
    getTotalRecordCount
  )

  useEffect(() => {
    if (isSuccess) {
      setRankingData(data.data.recordRankingDtos)
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (rankingData !== undefined) {
      if (rankingState === 0) {
        setRankingList(rankingData.slice(0, 5))
        if (rankingData.length > 5) setPlusBtnState(true)
      } else {
        setRankingList(rankingData)
        setPlusBtnState(false)
      }
    }
    if (rankingData?.length === 0) setPlusBtnState(false)
  }, [rankingPeriod, choosedCategoryId, rankingState, rankingData])

  useEffect(() => {
    if (!isFromDetailPage) {
      setParentCategoryId(CELEBRATION_ID)
      setRankingPeriod('DAY')
    }
  }, [])

  return (
    <div className="mt-4 w-full">
      <div className="pl-[26px]">
        <p className="text-sm leading-none">
          총{' '}
          <span className="text-primary-2">
            {totalRecordCount?.data.toLocaleString()} 개
          </span>
          의 레코딧
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
          <div className="mb-8">
            <RankingItemNoData />
          </div>
        )}
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
