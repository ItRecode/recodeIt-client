import React from 'react'
import { IMemoryRecord } from 'types/recordData'
import MemoryRecordItem from './MemoryRecordItem'
import { useMemoryRecord } from '@react-query/hooks/useMemoryRecord'
import Spinner from '@components/Spinner'

export default function MemoryRecord() {
  const { memoryRecord } = useMemoryRecord()

  if (!memoryRecord) {
    return <Spinner />
  }

  return (
    <>
      <h2 className="mt-3 text-lg font-semibold leading-[18px]">
        나만의 추억 레코드
      </h2>
      {memoryRecord.data.memoryRecordList?.map(
        (memoryRecord: IMemoryRecord) => (
          <MemoryRecordItem
            key={memoryRecord.recordId}
            recordId={memoryRecord.recordId}
            title={memoryRecord.title}
            iconName={memoryRecord.iconName}
            iconColor={memoryRecord.iconColor}
            commentList={memoryRecord.commentList}
          />
        )
      )}
    </>
  )
}
