import React, { Dispatch, SetStateAction } from 'react'
import { TEXT_DETAILS } from '@assets/constant/constant'

//이 컴포넌트를 호출할때는 위로와 축하로 나눠질 상황에서 실행될 setState을 props로 전달해야합니다.
type MainCategory = {
  onSetRecordType: Dispatch<SetStateAction<'celebration' | 'consolation'>>
  currentRecordType: string
}
function MainCategoryTap({ onSetRecordType, currentRecordType }: MainCategory) {
  const { CELEBRATION, CONSOLATION } = TEXT_DETAILS

  const typeConfig = {
    active: 'text-primary-2 border-b-2 border-current',
    inactive: 'text-gray-600',
  }

  return (
    <div className="flex justify-between border-b border-grey-3 bg-grey-1 px-16 text-lg font-semibold">
      <div
        className={`py-4 ${
          currentRecordType === CELEBRATION
            ? typeConfig.active
            : typeConfig.inactive
        }`}
        onClick={() => onSetRecordType(CELEBRATION)}
      >
        축하 레코드
      </div>
      <div
        className={`py-4 ${
          currentRecordType === CONSOLATION
            ? typeConfig.active
            : typeConfig.inactive
        }`}
        onClick={() => onSetRecordType(CONSOLATION)}
      >
        위로 레코드
      </div>
    </div>
  )
}

export default MainCategoryTap
