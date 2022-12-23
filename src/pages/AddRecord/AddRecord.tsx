import React, { useState } from 'react'
import BackButton from '@components/BackButton'
import AddRecordCategory from './AddRecordCategory'
import AddRecordInput from './AddRecordInput'
import AddRecordTextArea from './AddRecordTextArea'
import AddRecordColor from './AddRecordColor'
import AddRecordFile from './AddRecordFile'
import AddRecordTitle from './AddRecordTitle'
import { TEXT_DETAILS } from '@assets/constant/constant'
import MainCategoryTap from '@components/MainCategoryTap'

export type CheckAllType = {
  input: boolean
  textArea: boolean
}

export default function AddRecord() {
  const { CELEBRATION, CONSOLATION } = TEXT_DETAILS
  const CELEBRATE = 'celebrate'

  const [recordType, setRecordType] = useState<'celebration' | 'consolation'>(
    CELEBRATION
  )
  const [currentCategory, setCurrentCategory] = useState(CELEBRATE)
  const [checkAllFilled, setCheckAllFilled] = useState<CheckAllType>({
    input: false,
    textArea: false,
  })

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <div className="mb-6 pt-16">
      <BackButton />
      <MainCategoryTap
        currentRecordType={recordType}
        onSetRecordType={setRecordType}
      />
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
