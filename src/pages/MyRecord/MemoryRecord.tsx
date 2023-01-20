import React from 'react'
import { IMemoryRecord } from 'types/recordData'
import MemoryRecordItem from './MemoryRecordItem'
import { useMemoryRecord } from '@react-query/hooks/useMemoryRecord'
import { ReactComponent as Gift } from '@assets/record_icons/gift.svg'

export default function MemoryRecord() {
  const { memoryRecord } = useMemoryRecord()

  if (!memoryRecord) {
    return (
      <div className="ml-[2px] mt-6 flex gap-6">
        <div
          className={`flex h-[86px] w-[86px] items-center rounded-2xl bg-primary-4`}
        >
          <Gift className="flex aspect-square w-full" />
        </div>
        <div className="mt-[25px] text-center">
          <p className="text-sm font-semibold">아직 추억할 레코드가 없어요.</p>
          <p className="mt-1 text-xs">추억을 쌓아보세요.</p>
        </div>
      </div>
    )
  }

  return memoryRecord.data.memoryRecordList?.map(
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
  )
}
