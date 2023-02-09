import React, { useState } from 'react'
import { parentCategoryID } from 'types/category'
import { ReactComponent as Right_Arrow_icon } from '@assets/Expand_right.svg'
import { useNavigate } from 'react-router-dom'
import Category from '@components/Category'

export default function Ranking({
  parrentCategoryId,
}: {
  parrentCategoryId: parentCategoryID
}) {
  const navigate = useNavigate()
  const [choosedCategoryId, setChoosedCategoryId] = useState(0)

  return (
    <div className="relative mt-[43px]">
      <section id="title" className="flex items-center justify-between px-6">
        <button
          className="flex cursor-pointer items-center bg-transparent p-0"
          onClick={() => navigate('/rank')}
        >
          <p className="text-lg font-semibold">레코드 랭킹</p>
          <Right_Arrow_icon className="mb-1" />
        </button>
        <p className="text-xs text-grey-6">최근 일주일</p>
      </section>
      <section id="category" className="mt-6 pl-6">
        <Category
          slider={true}
          parrentCategoryId={parrentCategoryId}
          choosedCategoryId={choosedCategoryId}
          setChoosedCategoryId={setChoosedCategoryId}
        />
      </section>
    </div>
  )
}
