import React, { useState } from 'react'
import BackButton from '@components/BackButton'
import AddRecordCategory from '@pages/AddRecord/AddRecordCategory'
import AddRecordInput from '@pages/AddRecord/AddRecordInput'
import AddRecordTextArea from '@pages/AddRecord/AddRecordTextArea'
import AddRecordColor from '@pages/AddRecord/AddRecordColor'
import AddRecordFile from '@pages/AddRecord/AddRecordFile'
import AddRecordTitle from '@pages/AddRecord/AddRecordTitle'
import { TEXT_DETAILS } from '../../assets/constant/constant'

export type CheckAllType = {
  input: boolean
  textArea: boolean
}

export default function AddRecord() {
  const { CELEBRATION, CONSOLATION } = TEXT_DETAILS
  const CELEBRATE = 'celebrate'

  const [recordType, setRecordType] = useState<string>(CELEBRATION)
  const [currentCategory, setCurrentCategory] = useState(CELEBRATE)
  const [checkAllFilled, setCheckAllFilled] = useState<CheckAllType>({
    input: false,
    textArea: false,
  })

  const typeConfig = {
    active: 'text-primary-2 border-b-2 border-current pb-4',
    inactive: 'text-gray-600',
  }

  const handleRecordTypeToCelebration = (): void => {
    setRecordType(CELEBRATION)
  }

  const handleRecordTypeToConsolation = (): void => {
    setRecordType(CONSOLATION)
  }

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <div className="mb-6 pt-16">
      <BackButton />
      <div className="mt-6 flex justify-between border-b border-gray-300 px-10  text-lg font-semibold">
        <div
          className={`${
            recordType === 'celebration'
              ? typeConfig.active
              : typeConfig.inactive
          }`}
          onClick={handleRecordTypeToCelebration}
        >
          축하 레코드
        </div>
        <div
          className={`${
            recordType === CONSOLATION ? typeConfig.active : typeConfig.inactive
          }`}
          onClick={handleRecordTypeToConsolation}
        >
          위로 레코드
        </div>
      </div>
      <form onSubmit={handleSubmitData}>
        <AddRecordCategory currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 제목'} />
        <AddRecordInput
          checkAllFilled={checkAllFilled}
          setCheckAllFilled={setCheckAllFilled}
          currentRecordType={recordType}
        />
        <AddRecordTitle title={'레코드 설명'} />
        <AddRecordTextArea
          checkAllFilled={checkAllFilled}
          setCheckAllFilled={setCheckAllFilled}
          currentRecordType={recordType}
        />
        <AddRecordTitle title={'레코드 컬러'} />
        <AddRecordColor />
        <AddRecordTitle title={'레코드 아이콘'} />
        <AddRecordTitle title={'레코드 이미지'} />
        <AddRecordFile />
        <div className="border-t border-gray-200 py-4 px-5">
          <button className=" text-primary-2" type="submit">
            레코드 추가하기
          </button>
        </div>
      </form>
    </div>
  )
}
