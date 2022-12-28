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
import AddRecordIcon, { IconType } from './AddRecordIcon'
import Button from '@components/Button'
import { useNavigate } from 'react-router-dom'

export type CheckAllType = {
  input: boolean
  textArea: boolean
}

export default function AddRecord() {
  const { CELEBRATION } = TEXT_DETAILS

  const [recordType, setRecordType] = useState<keyof IconType>(CELEBRATION)
  const [checkAllFilled, setCheckAllFilled] = useState<CheckAllType>({
    input: false,
    textArea: false,
  })

  const navigate = useNavigate()

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    navigate('/record/1')
  }

  return (
    <div className="mb-6 pt-16">
      <div className="ml-[18px]">
        <BackButton />
      </div>
      <MainCategoryTap
        currentRecordType={recordType}
        onSetRecordType={setRecordType}
      />
      <form className="px-6" onSubmit={handleSubmitData}>
        <AddRecordCategory currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 제목'} />
        <AddRecordInput
          checkAllFilled={checkAllFilled}
          setCheckAllFilled={setCheckAllFilled}
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
        <AddRecordIcon currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 이미지'} />
        <AddRecordFile />
      </form>
      <div className="border-t border-grey-2 py-4 px-5">
        <Button
          property={'solid'}
          active={
            checkAllFilled.input && checkAllFilled.textArea ? true : false
          }
        >
          레코드 추가하기
        </Button>
      </div>
    </div>
  )
}
