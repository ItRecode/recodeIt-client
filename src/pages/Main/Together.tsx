import React, { useEffect, useState } from 'react'
import { getRandomRecordData } from '@apis/record'
import { CELEBRATION_ID } from '@assets/constant/constant'
import Spinner from '@components/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { parentCategoryID } from 'types/category'
import { IRandomRecordData } from 'types/recordData'
import TogetherSlider from './TogetherSlider'

export default function Together({
  parrentCategoryId,
}: {
  parrentCategoryId: parentCategoryID
}) {
  const navigate = useNavigate()

  const [randomRecordData, setRandomRecordData] = useState<
    IRandomRecordData[] | null
  >(null)

  const { data, isLoading, isSuccess } = useQuery(
    ['randomRecordData', parrentCategoryId],
    () => getRandomRecordData(parrentCategoryId),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  useEffect(() => {
    if (isSuccess) {
      setRandomRecordData(data.data)
    }
  }, [data, isSuccess])

  return (
    <div className="w-full">
      <section
        id="title"
        className="mt-10 mb-6 flex w-full justify-between px-6"
      >
        <p className="text-[24px] font-semibold leading-none">
          함께 {parrentCategoryId === CELEBRATION_ID ? '축하' : '위로'}해보세요!
        </p>
        <button
          className="cursor-pointer bg-transparent text-grey-6"
          onClick={() => navigate('/rank')}
        >
          전체보기
        </button>
      </section>
      <section
        id="slider"
        className="flex h-[200px] items-center justify-center"
      >
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <TogetherSlider
            randomRecordData={randomRecordData}
            parrentCategoryId={parrentCategoryId}
          />
        )}
      </section>
    </div>
  )
}
