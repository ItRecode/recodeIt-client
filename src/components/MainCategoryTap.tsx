import React from 'react'
import { TEXT_DETAILS } from '@assets/constant/constant'

//이 컴포넌트를 호출할때는 위로와 축하로 나눠질 상황에서 실행될 함수들을 꼭 props로 전달해주셔야 합니다.
type MainCategory = {
  onRecordCelebration: () => void
  onRecordConsolation: () => void
  currentRecordType: string
}
function MainCategoryTap({
  onRecordCelebration,
  onRecordConsolation,
  currentRecordType,
}: MainCategory) {
  const { CELEBRATION, CONSOLATION } = TEXT_DETAILS

  const typeConfig = {
    active: 'text-primary-2 border-b-2 border-current pb-4',
    inactive: 'text-gray-600',
  }

  const handleRecordTypeToCelebration = (): void => {
    onRecordCelebration()
  }

  const handleRecordTypeToConsolation = (): void => {
    onRecordConsolation()
  }

  return (
    <div className="mt-6 flex justify-between border-b border-gray-300 px-10  text-lg font-semibold">
      <div
        className={`${
          currentRecordType === CELEBRATION
            ? typeConfig.active
            : typeConfig.inactive
        }`}
        onClick={handleRecordTypeToCelebration}
      >
        축하 레코드
      </div>
      <div
        className={`${
          currentRecordType === CONSOLATION
            ? typeConfig.active
            : typeConfig.inactive
        }`}
        onClick={handleRecordTypeToConsolation}
      >
        위로 레코드
      </div>
    </div>
  )
}

export default MainCategoryTap
