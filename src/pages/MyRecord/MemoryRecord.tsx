import React, { useEffect, useState } from 'react'
import { IRecordMemoryDataItem } from 'types/recordData'
import MemoryRecordItem from './MemoryRecordItem'
import dummyData from './dummy.json'

type IMemoryRecordList = IRecordMemoryDataItem[]

export default function MemoryRecord() {
  const [memoryRecordList, setMemoryRecordList] =
    useState<IMemoryRecordList | null>(null)

  useEffect(() => {
    setMemoryRecordList(dummyData)
  })

  return (
    <>
      <h2 className="mt-3 text-lg font-semibold leading-[18px]">
        나만의 추억 레코드
      </h2>
      {memoryRecordList?.map(
        ({ recordId, title, iconName, colorName, commentList }) => (
          <MemoryRecordItem
            key={recordId}
            recordId={recordId}
            title={title}
            iconName={iconName}
            colorName={colorName}
            commentList={commentList}
          />
        )
      )}
    </>
  )
}
