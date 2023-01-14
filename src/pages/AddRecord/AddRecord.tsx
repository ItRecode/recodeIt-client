import React, { useEffect, useState } from 'react'
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
import { formDataAtom } from '@store/atom'
import { useRecoilValue } from 'recoil'
import { enrollRecord } from '@apis/record'

export type CheckAllType = {
  input: boolean
  textArea: boolean
}

export type FormDataType = {
  selectedCategory: number
  selectedColor: string
  selectedIcon: string
}

export interface WriteRecordRequestDto {
  colorName: string
  content: string
  iconName: string
  recordCategoryId: number
  title: string
}

export default function AddRecord() {
  const { CELEBRATION } = TEXT_DETAILS

  const [recordType, setRecordType] = useState<keyof IconType>(CELEBRATION)
  const [checkAllFilled, setCheckAllFilled] = useState<CheckAllType>({
    input: false,
    textArea: false,
  })
  const { selectedCategory, selectedColor, selectedIcon }: FormDataType =
    useRecoilValue(formDataAtom)
  const [files, setFiles] = useState<File>()
  const navigate = useNavigate()

  useEffect(() => {
    setCheckAllFilled({ input: false, textArea: false })
  }, [recordType])

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = makeFormDatas(e)
    const enroll = async () => {
      const response = await enrollRecord(formData)
      setFiles(undefined)
      navigate(`/record/${response.data.recordId}`)
    }
    enroll()
  }

  const makeFormDatas = (e: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = e.target as any
    const formData: WriteRecordRequestDto = {
      colorName: selectedColor,
      content: target[5].value,
      iconName: selectedIcon,
      recordCategoryId: selectedCategory,
      title: target[4].value,
    }

    const data = new FormData()

    data.append('files', files as Blob, files?.name)
    data.append(
      'writeRecordRequestDto',
      new Blob([JSON.stringify(formData)], { type: 'application/json' })
    )
    return data
  }

  return (
    <div className="relative pt-4">
      <div className="ml-[18px]">
        <BackButton />
      </div>
      <div className="sticky top-0 left-0 z-[5] bg-grey-1">
        <MainCategoryTap
          currentRecordType={recordType}
          onSetRecordType={setRecordType}
        />
      </div>
      <form
        encType="multipart/form-data"
        className="px-6"
        onSubmit={handleSubmitData}
      >
        <AddRecordCategory currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 제목'} />
        <AddRecordInput
          currentRecordType={recordType}
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
        <AddRecordColor currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 아이콘'} />
        <AddRecordIcon currentRecordType={recordType} />
        <AddRecordTitle title={'레코드 이미지'} />
        <AddRecordFile currentRecordType={recordType} setFiles={setFiles} />
        <div className="sticky bottom-0 left-0 ml-[-24px] w-[calc(100%+48px)] border-t border-grey-2 bg-grey-1 py-4 px-6">
          <Button
            property={'solid'}
            disabled={!(checkAllFilled.input && checkAllFilled.textArea)}
            type="submit"
            active={
              checkAllFilled.input && checkAllFilled.textArea ? true : false
            }
          >
            레코드 추가하기
          </Button>
        </div>
      </form>
    </div>
  )
}
