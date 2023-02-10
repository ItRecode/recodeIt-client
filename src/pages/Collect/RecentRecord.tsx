import React from 'react'
import { ReactComponent as Front } from '@assets/front.svg'
import { ReactComponent as Reset } from '@assets/collect_page_icon/reset.svg'

function RecentRecord() {
  return (
    <div className="sticky top-0 left-0 p-6 pb-20">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center   ">
          <p className="mr-3 text-[18px] font-semibold">최신 레코드</p>
          <Front />
        </div>
        <p className="text-xs font-medium text-grey-8">12: 00 기준</p>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[14px] font-medium text-grey-8">
          지금 축하받는 레코드는?
        </p>
        <Reset className="cursor-pointer" />
      </div>
    </div>
  )
}

export default RecentRecord
