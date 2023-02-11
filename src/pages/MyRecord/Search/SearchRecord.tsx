import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BackButton from '@components/BackButton'
import SearchInput from '../Common/SearchInput'
import MyRecordCard from '../Common/MyRecordCard'
import useDebounce from '@hooks/useDebounce'
import { useMyRecordByKeyword } from '@react-query/hooks/useMyRecordByKeyword'

export default function SearchRecord() {
  const { state } = useLocation() // 전역에 저장해놓기 => 검색어 없으면 메인으로 돌리기..?
  const [keyword, setKeyword] = useState(state || '')
  const { myRecordByKeyword, setKeywordWithQuery } = useMyRecordByKeyword(state)

  useDebounce(
    () => {
      if (keyword.length > 0) {
        setKeywordWithQuery(keyword)
      }
    },
    300,
    [keyword]
  )

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
        {myRecordByKeyword?.pages.map((page) =>
          page.data.recordBySearchDtos.map((record) => (
            <div className="mt-6" key={record.recordId}>
              <MyRecordCard
                recordId={record.recordId}
                title={record.title}
                categoryName={record.categoryName}
                commentCount={record.commentCount}
                iconName={record.iconName}
                colorName={record.colorName}
                createdAt={record.createdAt}
              />
            </div>
          ))
        )}
      </section>
    </>
  )
}
