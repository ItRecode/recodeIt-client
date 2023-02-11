import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BackButton from '@components/BackButton'
import SearchInput from '../Common/SearchInput'
import MyRecordCard from '../Common/MyRecordCard'

export default function SearchRecord() {
  const { state } = useLocation()
  const [keyword, setKeyword] = useState(state || '')
  const record = {
    categoryName: '축하해주세요',
    recordId: 276,
    title: 'ㅎㅇㅎ',
    iconName: 'gift',
    colorName: 'icon-yellow',
    createdAt: '2023-02-11T14:22:21.853545',
    commentCount: 0,
  }

  return (
    <>
      <section id="route-backIcon-button" className="ml-[18px] mt-4">
        <BackButton />
      </section>
      <section id="search-bar" className="mt-2 bg-grey-1 py-4 px-6">
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          setKeyword={setKeyword}
        />
      </section>
      <section id="my-today-record">
        <div className="mt-3 px-6">
          <h1 className="text-2xl font-semibold">마이 레코드</h1>
        </div>
      </section>
      <section id="search-result-records" className="mt-4 mb-10 w-full px-6">
        <MyRecordCard
          recordId={record.recordId}
          title={record.title}
          categoryName={record.categoryName}
          commentCount={record.commentCount}
          iconName={record.iconName}
          colorName={record.colorName}
          createdAt={record.createdAt}
        />
      </section>
    </>
  )
}
