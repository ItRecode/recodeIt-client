import { getRandomRecordData } from '@apis/record'
import Spinner from '@components/Spinner'
import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IRandomRecordData } from 'types/recordData'
import TogetherSlider from './TogetherSlider'
import TogetherTab from './TogetherTab'

export default function Together({
  categoryId,
  setCategoryId,
}: {
  categoryId: 1 | 2
  setCategoryId: Dispatch<SetStateAction<1 | 2>>
}) {
  const navigate = useNavigate()

  const [randomRecordData, setRandomRecordData] = useState<
    IRandomRecordData[] | null
  >(null)

  const { data, isLoading, isSuccess } = useQuery(
    ['randomRecordData', categoryId],
    () => getRandomRecordData(categoryId),
    {
      retry: false,
      refetchOnMount: false,
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
    <div className="h-[50px] w-full">
      <section id="tab">
        <TogetherTab categoryId={categoryId} setCategoryId={setCategoryId} />
      </section>
      <section
        id="title"
        className="mt-10 mb-6 flex w-full justify-between px-6"
      >
        <p className="text-[24px] font-semibold leading-none">
          함께 {categoryId === 1 ? '축하' : '위로'}해보세요!
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
        className="flex h-[200px] items-center justify-center "
      >
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <TogetherSlider
            randomRecordData={randomRecordData}
            categoryId={categoryId}
          />
        )}
      </section>
    </div>
  )
}
