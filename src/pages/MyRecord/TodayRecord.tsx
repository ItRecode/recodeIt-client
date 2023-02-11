import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyRecord } from '@react-query/hooks/useMyRecord'
import MyRecordCard from './Common/MyRecordCard'

export default function TodayRecord() {
  const navigate = useNavigate()
  const { todayRecord } = useMyRecord()

  if (!todayRecord) {
    return (
      <>
        <div className="mt-10 mb-[49px] w-full text-center">
          <span className="text-xs leading-5">
            오늘 쓴 레코드가 없어요!
            <br />
            레코드를 쓰고 추억을 공유해보세요.
          </span>
          <div
            className="mt-4 cursor-pointer text-sm font-semibold leading-5 text-primary-2 underline underline-offset-4"
            onClick={() => navigate('/record/add')}
          >
            레코드 추가하러 가기
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="mt-4 mb-10 w-full px-6">
      <MyRecordCard
        recordId={todayRecord.recordId}
        title={todayRecord.title}
        categoryName={todayRecord.categoryName}
        commentCount={todayRecord.commentCount}
        iconName={todayRecord.iconName}
        colorName={todayRecord.colorName}
        createdAt={todayRecord.createdAt}
      />
    </div>
  )
}
