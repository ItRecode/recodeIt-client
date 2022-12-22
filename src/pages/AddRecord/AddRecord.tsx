import React, { useState } from 'react'
import BackButton from '@components/BackButton'
import AddRecordCategory from './AddRecordCategory'
import AddRecordInput from './AddRecordInput'
import AddRecordTextArea from './AddRecordTextArea'
import AddRecordColor from './AddRecordColor'
import AddRecordFile from './AddRecordFile'

export type RecordType = string
export type CheckAllType = {
  input: boolean
  textArea: boolean
}

export default function AddRecord() {
  const [recordType, setRecordType] = useState('celebration')
  const [currentCategory, setCurrentCategory] = useState('celebrate')
  const [checkAllFilled, setCheckAllFilled] = useState({
    input: false,
    textArea: false,
  })

  console.log(checkAllFilled)

  const typeConfig = {
    active: 'text-primary-2 border-b-2 border-current pb-4',
    inactive: 'text-gray-600',
  }

  const handleRecordTypeToCelebration = (): void => {
    setRecordType('celebration')
  }

  const handleRecordTypeToConsolation = (): void => {
    setRecordType('consolation')
  }

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(e)
  }

  const titleStyle = 'text-lg font-semibold text-gray-900 mb-6'

  return (
    <div className="pt-16 mb-6">
      <BackButton />
      <div className="mt-6 px-10 flex justify-between text-lg font-semibold  border-b border-gray-300">
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
            recordType === 'consolation'
              ? typeConfig.active
              : typeConfig.inactive
          }`}
          onClick={handleRecordTypeToConsolation}
        >
          위로 레코드
        </div>
      </div>
      <form onSubmit={handleSubmitData}>
        <AddRecordCategory currentRecordType={recordType} />
        <div className={titleStyle}>레코드 제목</div>
        <AddRecordInput
          checkAllFilled={checkAllFilled}
          setCheckAllFilled={setCheckAllFilled}
          currentRecordType={recordType}
        />
        <div className={titleStyle}>레코드 설명</div>
        <AddRecordTextArea
          checkAllFilled={checkAllFilled}
          setCheckAllFilled={setCheckAllFilled}
          currentRecordType={recordType}
        />
        <div className={titleStyle}>레코드 컬러</div>
        <AddRecordColor />
        <div className={titleStyle}>레코드 아이콘</div>
        <div className={titleStyle}>레코드 이미지</div>
        <AddRecordFile />
        <div className="border-t py-4 px-5 border-gray-200">
          <button className=" text-primary-2" type="submit">
            레코드 추가하기
          </button>
        </div>
      </form>
    </div>
  )
}
