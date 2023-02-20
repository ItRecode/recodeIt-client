import React, { useState } from 'react'
import { parentCategoryID } from 'types/category'
import { ReactComponent as Right_Arrow_icon } from '@assets/Expand_right.svg'
import { useNavigate } from 'react-router-dom'
import Category from '@components/Category'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '@apis/record'
import { useEffect } from 'react'
import { IRankingRecordData } from 'types/recordData'
import RankingList from './RankingList'
import { useRecoilState } from 'recoil'
import { subCategoryIdAtomMainPage } from '@store/mainPageAtom'

export default function Ranking({
  parentCategoryId,
}: {
  parentCategoryId: parentCategoryID
}) {
  const navigate = useNavigate()
  const [rankingData, setRankingData] = useState<IRankingRecordData[]>()
  const [choosedCategoryId, setChoosedCategoryId] = useRecoilState<number>(
    subCategoryIdAtomMainPage
  )

  const { data, isSuccess } = useQuery(
    ['ranking', choosedCategoryId],
    () => getRanking(choosedCategoryId, 'WEEK'),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (isSuccess) {
      setRankingData(data.data.recordRankingDtos)
    }
  }, [data, isSuccess])

  return (
    <div className="relative mt-[43px]">
      <section id="title" className="flex items-center justify-between px-6">
        <button
          className="flex h-6 cursor-pointer items-center bg-transparent p-0"
          onClick={() => navigate('/collect')}
        >
          <p className="h-full pt-[4px] text-lg font-semibold leading-none">
            레코드 랭킹
          </p>
          <Right_Arrow_icon />
        </button>
        <p className="text-xs text-grey-6">최근 일주일</p>
      </section>
      <section id="category" className="mt-6 pl-6">
        <Category
          slider={true}
          parentCategoryId={parentCategoryId}
          choosedCategoryId={choosedCategoryId}
          setChoosedCategoryId={setChoosedCategoryId}
        />
      </section>
      <section>
        <RankingList
          rankingData={rankingData}
          parentCategoryId={parentCategoryId}
        />
      </section>
    </div>
  )
}
