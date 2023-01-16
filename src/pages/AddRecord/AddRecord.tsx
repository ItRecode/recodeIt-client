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
import Alert from '@components/Alert'

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
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate()
  const [isClickBackButton, setIsBackButton] = useState(false)
  const [isLoadingWhileSubmit, setIsLoadingWhileSubmit] = useState(false)

  useEffect(() => {
    setCheckAllFilled({ input: false, textArea: false })
  }, [recordType])

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = makeFormDatas(e)
    const enroll = async () => {
      const response = await enrollRecord(formData)
      setFiles(undefined)
      navigate(`/record/${response.data.recordId}`, {
        replace: true,
      })
    }
    enroll()
    setIsLoadingWhileSubmit(true)
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
    if (files !== undefined && files.length > 0) {
      files?.forEach((file) => {
        data.append('files', file as File, file?.name)
      })
    }
    data.append(
      'writeRecordRequestDto',
      new Blob([JSON.stringify(formData)], { type: 'application/json' })
    )
    return data
  }

  return (
    <div className="relative pt-4">
      <div className="ml-[18px]">
        <BackButton onClick={() => setIsBackButton(true)} />
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
        <AddRecordFile
          currentRecordType={recordType}
          files={files}
          setFiles={setFiles}
        />
        <div className="sticky bottom-0 left-0 ml-[-24px] w-[calc(100%+48px)] border-t border-grey-2 bg-grey-1 py-4 px-6">
          <Button
            property={'solid'}
            disabled={!(checkAllFilled.input && checkAllFilled.textArea)}
            type="submit"
            active={
              checkAllFilled.input && checkAllFilled.textArea ? true : false
            }
            loading={isLoadingWhileSubmit}
          >
            레코드 추가하기
          </Button>
        </div>
        {isClickBackButton && (
          <Alert
            visible={isClickBackButton}
            mainMessage={
              <div className="text-base font-semibold leading-6">
                작성중인
                <br />
                레코드가 있어요
              </div>
            }
            subMessage={
              <>
                작성하신 내용이 모두 <span className="text-sub-1">삭제</span>
                됩니다
              </>
            }
            cancelMessage="나가기"
            confirmMessage="계속하기"
            onClose={() => setIsBackButton(false)}
            onCancel={() => navigate('/')}
            onConfirm={() => setIsBackButton(false)}
          />
        )}
      </form>
    </div>
  )
}
