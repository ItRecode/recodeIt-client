import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import React, { Suspense, lazy, useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IRecordDataType } from 'types/recordData'
import {
  INITIAL_RECORD_DATA,
  RECORD_DETAIL_INITIAL_INPUT_HEIGHT,
} from '@assets/constant/constant'
import { getCreatedDate } from './getCreatedDate'
import ReplyList from './ReplyList'
import ReplyInput from './ReplyInput'
import { useRef } from 'react'
import { deleteRecord, getRecord } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import { getChipIconName } from './getChipIconName'
import ImageContainer from './ImageContainer'
import { useUser } from '@react-query/hooks/useUser'
import { AxiosError } from 'axios'
import { createBrowserHistory } from 'history'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  checkFromDetailPage,
  DetailPageInputMode,
  modifyComment,
  nestedReplyState,
} from '@store/detailPageAtom'
import { SessionStorage } from '@utils/sessionStorage'
import { PREVIOUS_URL } from '@assets/constant/others'

const MoreButton = lazy(() => import('@components/MoreButton'))
const NotFound = lazy(() => import('@pages/NotFound/NotFound'))
const Alert = lazy(() => import('@components/Alert'))
const Modal = lazy(() => import('@components/Modal'))
const MemoizedShareModal = lazy(() => import('./ShareModal'))
const EditModal = lazy(() => import('./EditModal'))

export default function DetailRecord() {
  const [shareStatus, setShareStatus] = useState(false)
  const [editModalState, setEditModalState] = useState(false)

  const [date, setDate] = useState('')
  const [recordData, setRecordData] =
    useState<IRecordDataType>(INITIAL_RECORD_DATA)

  const {
    recordId,
    categoryName,
    title,
    content,
    writer,
    colorName,
    iconName,
    createdAt,
    imageUrls,
  } = recordData
  const text = content.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n')
  const { user } = useUser()

  const background_color = `bg-${colorName}`

  const { recordIdParams } = useParams()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.previousUrl === '/collect') {
      SessionStorage.set('previousPage', 'detailPage')
    }
  }, [])

  const { data, isError, isSuccess } = useQuery(
    ['getRecordData', recordIdParams],
    () => getRecord(recordIdParams),
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
  const POST_ID = location.pathname.substring(8)

  const [isDelete, setIsDelete] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setRecordData(data)
    }
  }, [data, isError])

  useEffect(() => {
    if (createdAt) {
      setDate(getCreatedDate(createdAt))
    }
  }, [recordData])

  const scrollSectionFragments = useRef<HTMLDivElement>(null)
  const [inputSectionHeight, setInputSectionHeight] = useState(
    RECORD_DETAIL_INITIAL_INPUT_HEIGHT
  )

  useEffect(() => {
    if (scrollSectionFragments.current !== null) {
      scrollSectionFragments.current.style.height = 'auto'
      scrollSectionFragments.current.style.height = inputSectionHeight + 'px'
    }
  }, [inputSectionHeight])

  const deleteRecordById = async (id: string) => {
    try {
      await deleteRecord(id)
      setIsDelete(true)
      setEditModalState(false)
    } catch (error) {
      const { response } = error as unknown as AxiosError
      if (response?.status === 400) {
        alert('질못된 접근입니다.')
      }
      throw error
    }
  }

  const history = createBrowserHistory()
  const resetInputMode = useResetRecoilState(DetailPageInputMode)
  const resetNestedReplyState = useResetRecoilState(nestedReplyState)
  const resetModifyComment = useResetRecoilState(modifyComment)
  const fromDetailPage = useSetRecoilState(checkFromDetailPage)

  useEffect(() => {
    fromDetailPage(true)
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === 'POP' || action === 'PUSH') {
        resetInputMode()
        resetNestedReplyState()
        resetModifyComment()
        fromDetailPage(false)
      }
      return unlistenHistoryEvent
    })
  }, [history])

  const handleBackButton = () => {
    navigate(`/${SessionStorage.get(PREVIOUS_URL)}`)
  }
  return (
    <>
      {isError ? (
        <Suspense>
          <NotFound />
        </Suspense>
      ) : (
        <div className="relative h-screen w-full">
          {shareStatus && (
            <Suspense>
              <Modal
                visible={shareStatus}
                onClose={() => setShareStatus(false)}
              >
                <MemoizedShareModal
                  setShareStatus={setShareStatus}
                  recordId={recordId}
                  title={title}
                  description={content}
                  backgroundColor={background_color}
                  iconName={iconName}
                  imageUrl={imageUrls[0]}
                />
              </Modal>
            </Suspense>
          )}
          {editModalState && (
            <Suspense>
              <EditModal
                POST_ID={POST_ID}
                setIsDelete={setIsDelete}
                setEditModalState={setEditModalState}
              />
            </Suspense>
          )}
          {isDelete && (
            <Suspense>
              <Alert
                mainMessage={
                  <div className="text-base font-semibold leading-6">
                    정말로 이 레코드를
                    <br />
                    <span className="text-sub-1">삭제</span>하시겠어요?
                  </div>
                }
                subMessage={<>삭제 후 복구는 불가능해요.</>}
                visible={isDelete}
                cancelMessage="취소"
                confirmMessage="삭제"
                danger={true}
                onClose={() => setIsDelete(false)}
                onCancel={() => setIsDelete(false)}
                onConfirm={() => {
                  deleteRecordById(POST_ID)
                  navigate(-1)
                }}
              />
            </Suspense>
          )}
          <header className="p-4">
            <nav className="flex justify-between">
              <BackButton onClick={handleBackButton} />
              {user?.data === writer && (
                <button
                  className="cursor-pointer bg-transparent"
                  onClick={() => setEditModalState(true)}
                >
                  <MoreButton />
                </button>
              )}
            </nav>
          </header>
          <div className="overflow-y-auto">
            <section id="title" className="flex flex-col px-[18px]">
              <div className="flex justify-between whitespace-nowrap">
                <p className="flex items-center whitespace-nowrap text-2xl font-semibold leading-none">
                  {title}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex">
                  <p className="flex items-center text-[14px]">{writer}</p>
                  <p className="px-2 text-xs text-grey-5">{date}</p>
                </div>
                <Chip
                  active={true}
                  icon={getChipIconName(categoryName)}
                  message={`${categoryName}`}
                  property="small"
                  pointer={false}
                />
              </div>
            </section>
            <section
              id="record_context"
              className="flex w-full flex-col items-center px-[18px]"
            >
              <ImageContainer
                background_color={background_color}
                iconName={iconName}
                imageUrls={imageUrls}
              />
              <Button onClick={() => setShareStatus(true)}>
                <p className="text-base font-semibold">공유하기</p>
              </Button>
              <div className="mt-6 mb-10 w-full px-1.5 text-[14px] leading-normal">
                <p className="w-full whitespace-pre-wrap break-words">{text}</p>
              </div>
            </section>
            <section id="record_reply_list">
              <ReplyList recordId={recordIdParams} Recordwriter={writer} />
            </section>
            <div ref={scrollSectionFragments} />
          </div>
          <section
            id="record_reply_input"
            className="fixed bottom-0 w-full max-w-[420px] border-t border-solid border-t-grey-2 bg-grey-1"
          >
            <ReplyInput
              setInputSectionHeight={setInputSectionHeight}
              recordIdParams={recordIdParams}
            />
          </section>
        </div>
      )}
    </>
  )
}
