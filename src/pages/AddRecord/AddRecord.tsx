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
import AddRecordIcon from './AddRecordIcon'
import Button from '@components/Button'
import { useNavigate } from 'react-router-dom'
import { formDataAtom, recordTypeAtom } from '@store/atom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { enrollRecord, modifyRecord, getRecord } from '@apis/record'
import Alert from '@components/Alert'
import { LocalStorage } from '@utils/localStorage'
import { useQuery } from '@tanstack/react-query'
import Loading from '@components/Loading'

export type IsInputsHasValueType = {
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

interface modifyRecordRequestDto {
  colorName: string
  content: string
  iconName: string
  title: string
  deleteImages: string[]
}

export type IsInputFocusType = {
  isTextAreaFocused: boolean
  isInputFocused: boolean
}

export default function AddRecord() {
  const { CELEBRATION } = TEXT_DETAILS
  const RECORD_ID = LocalStorage.get('postId') as string
  const isModify = LocalStorage.get('modifyMode') === 'true'

  const navigate = useNavigate()

  const [isInputsHasValue, setIsInputsHasValue] =
    useState<IsInputsHasValueType>({
      input: false,
      textArea: false,
    })
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const { selectedCategory, selectedColor, selectedIcon }: FormDataType =
    formData
  const [files, setFiles] = useState<File[]>([])
  const [isClickBackButton, setIsBackButton] = useState(false)
  const [isLoadingWhileSubmit, setIsLoadingWhileSubmit] = useState(false)
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  //isMobile,isInputFocus가 휴대폰 일때 버튼 스티키를 유지해주기 위한 상태인데 이거 나중에 다시 이걸로 돌아올 수도 있을것 같아서 놔둘게요
  const [toDeleteFiles, setToDeleteFiles] = useState<string[]>([])
  const [recordType, setRecordType] = useRecoilState(recordTypeAtom)
  const {
    data: recordData,
    isLoading,
    isSuccess,
  } = useQuery(['getRecordData', RECORD_ID], () => getRecord(RECORD_ID), {
    enabled: isModify,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!isModify) {
      setFormData({
        selectedIcon: recordType === 'celebration' ? 'gift' : 'moon',
        selectedCategory: recordType === 'celebration' ? 3 : 7,
        selectedColor: 'icon-purple',
      })
      setIsInputsHasValue({ input: false, textArea: false })
    }
  }, [recordType])

  useEffect(() => {
    if (recordData !== undefined) {
      setIsInputsHasValue({
        input: recordData.title,
        textArea: recordData.content,
      })
      setFormData({ ...formData, selectedColor: recordData.colorName })
      const changeCurrentRecordType = () => {
        const categoryName = recordData?.categoryName
        if (categoryName) {
          if (
            categoryName === '축하해주세요' ||
            categoryName === '기념일이에요' ||
            categoryName === '연애중이에요' ||
            categoryName === '행복해요'
          ) {
            setRecordType(CELEBRATION)
          } else if (
            categoryName === '위로해주세요' ||
            categoryName === '공감이 필요해요' ||
            categoryName === '내편이 되어주세요' ||
            categoryName === '우울해요'
          ) {
            setRecordType('consolation')
          }
        }
      }
      changeCurrentRecordType()
    }
  }, [recordData])

  useEffect(() => {
    function detectMobileDevice(agent: string): boolean {
      const mobileRegex = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ]

      return mobileRegex.some((mobile) => agent.match(mobile))
    }

    setIsMobile(detectMobileDevice(window.navigator.userAgent))
  }, [isInputFocus])

  const resetFormDataAtom = useResetRecoilState(formDataAtom)
  const resetRecordTypeAtom = useResetRecoilState(recordTypeAtom)

  useEffect(() => {
    const removeModifyMode = () => {
      LocalStorage.remove('postId')
      LocalStorage.remove('modifyMode')
    }
    window.addEventListener('beforeunload', removeModifyMode)
    return () => {
      resetRecordTypeAtom()
      resetFormDataAtom()
      removeModifyMode()
      window.removeEventListener('beforeunload', removeModifyMode)
    }
  }, [])

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isLoadingWhileSubmit) return
    const formData = makeFormData(e)
    setIsLoadingWhileSubmit(true)
    const enroll = async () => {
      try {
        const response = await enrollRecord(formData)
        setFiles([])
        navigate(`/record/${response.data.recordId}`, {
          replace: true,
        })
      } catch {
        setIsLoadingWhileSubmit(false)
        alert('레코드 추가 실패 - 새로고침해서 다시 작성해주세요.')
      }
    }

    const modify = async () => {
      try {
        const response = await modifyRecord(RECORD_ID, formData)
        setFiles([])
        navigate(`/record/${response.data}`, {
          replace: true,
        })
      } catch {
        alert('레코드 수정 실패')
        setIsLoadingWhileSubmit(false)
        navigate(`/record/${RECORD_ID}`, { replace: true })
      }
    }
    if (isModify) {
      modify()
    } else {
      enroll()
    }
  }

  const makeLineBreak = (content: string): string => {
    return content.replaceAll(/(\n|\r\n)/g, '<br>')
  }

  const makeFormData = (e: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = e.target as any
    const formTitle = target[4].value
    const formContent = target[5].value

    const formData: WriteRecordRequestDto = {
      title: formTitle,
      content: makeLineBreak(formContent),
      colorName: selectedColor,
      iconName: selectedIcon,
      recordCategoryId: selectedCategory,
    }

    const modifyFormData: modifyRecordRequestDto = {
      title: formTitle,
      content: makeLineBreak(formContent),
      colorName: selectedColor,
      iconName: selectedIcon,
      deleteImages: toDeleteFiles,
    }

    const data = new FormData()
    if (files !== undefined && files.length > 0) {
      files.forEach((file) => {
        data.append('attachments', file as File, file.name)
      })
    }

    data.append(
      isModify ? 'modifyRecordRequestDto' : 'writeRecordRequestDto',
      new Blob([JSON.stringify(isModify ? modifyFormData : formData)], {
        type: 'application/json',
      })
    )
    return data
  }

  return (
    <div className="relative pt-4">
      {isLoading && recordData !== undefined && <Loading />}
      {(isSuccess || recordData === undefined) && (
        <>
          <div className="ml-[18px]">
            <BackButton onClick={() => setIsBackButton(true)} />
          </div>
          <div
            className={`${
              isModify && 'pointer-events-none'
            } sticky top-0 left-0 z-[5] bg-grey-1`}
          >
            <MainCategoryTap
              isModify={isModify}
              currentRecordType={recordType}
              onSetRecordType={setRecordType}
            />
          </div>
          <form
            encType="multipart/form-data"
            className="px-6"
            onSubmit={handleSubmitData}
          >
            <AddRecordCategory
              isModify={isModify}
              recordCategory={recordData?.categoryId}
            />
            <AddRecordTitle isModify={isModify} title={'레코드 제목'} />
            <AddRecordInput
              recordTitle={recordData?.title}
              isInputsHasValue={isInputsHasValue}
              setIsInputsHasValue={setIsInputsHasValue}
              setIsInputFocus={setIsInputFocus}
            />
            <AddRecordTitle title={'레코드 설명'} />
            <AddRecordTextArea
              recordContent={recordData?.content}
              isInputsHasValue={isInputsHasValue}
              setIsInputsHasValue={setIsInputsHasValue}
              currentRecordType={recordType}
              setIsInputFocus={setIsInputFocus}
            />
            <AddRecordTitle title={'레코드 컬러'} />
            <AddRecordColor recordColor={recordData?.colorName} />
            <AddRecordTitle title={'레코드 아이콘'} />
            <AddRecordIcon
              recordIcon={recordData?.iconName}
              currentRecordType={recordType}
            />
            <AddRecordTitle title={'레코드 이미지'} />
            <AddRecordFile
              toDeleteFiles={toDeleteFiles}
              setToDeleteFiles={setToDeleteFiles}
              isModify={isModify}
              recordFiles={recordData?.imageUrls}
              files={files}
              setFiles={setFiles}
            />
            <div
              className={`${
                isInputFocus && isMobile && 'block'
              } bottom-0 left-0 ml-[-24px] w-[calc(100%+48px)] border-t border-grey-2 bg-grey-1 py-4 px-6`}
            >
              <Button
                property={'solid'}
                disabled={
                  !(isInputsHasValue.input && isInputsHasValue.textArea) ||
                  isLoadingWhileSubmit
                }
                type="submit"
                active={isInputsHasValue.input && isInputsHasValue.textArea}
                loading={isLoadingWhileSubmit}
              >
                {isModify ? '수정하기' : '레코드 추가하기'}
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
                    작성하신 내용이 모두{' '}
                    <span className="text-sub-1">삭제</span>
                    됩니다
                  </>
                }
                cancelMessage="나가기"
                confirmMessage="계속하기"
                onClose={() => setIsBackButton(false)}
                onCancel={() => navigate(-1)}
                onConfirm={() => setIsBackButton(false)}
              />
            )}
          </form>
        </>
      )}
    </div>
  )
}
