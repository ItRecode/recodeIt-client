import { INPUT_MODE } from '@assets/constant/constant'
import { useUser } from '@react-query/hooks/useUser'
import { scrollTarget } from '@store/atom'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { CommentData } from 'types/replyData'
import { getCreatedDate } from './getCreatedDate'
import { ReactComponent as Arrow_Down_icon } from '@assets/detail_page_icon/arrow_down.svg'
import { ReactComponent as Arrow_Up_icon } from '@assets/detail_page_icon/arrow_up.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteReply, getReply } from '@apis/reply'
import {
  DetailPageInputMode,
  modifyComment,
  nestedReplyState,
} from '@store/detailPageAtom'

const NestedReplyList = React.lazy(() => import('./NestedReplyList'))
const Alert = React.lazy(() => import('@components/Alert'))

export default function ReplyItem({
  content,
  createdAt,
  imageUrl,
  recordwriter,
  numOfSubComment,
  writer,
  commentId,
  recordId,
}: CommentData) {
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)
  const nestedReplyList = useRecoilValue(nestedReplyState)
  const [openNestedReplyList, setOpenNestedReplyList] = useState<boolean>(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const scrollTargetId = useRecoilValue(scrollTarget)
  const resetSrollTarget = useResetRecoilState(scrollTarget)

  const setInputMode = useSetRecoilState(DetailPageInputMode)
  const setModifyCommentDto = useSetRecoilState(modifyComment)

  useEffect(() => {
    if (commentId === scrollTargetId.commentId) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      resetSrollTarget()
    }
  }, [scrollTargetId])

  const text = content.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n')
  const queryClient = useQueryClient()

  const { mutate: onDeleteReply } = useMutation(
    () => deleteReply(commentId, recordId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getReplyData', recordId])
        setDeleteAlert(false)
      },
    }
  )

  const onClickUpdateComment = () => {
    setInputMode((prev) => {
      return { ...prev, mode: 'update' }
    })
    setModifyCommentDto({
      commentId,
      content: content,
      imageUrl: imageUrl ? imageUrl : '',
    })
  }

  useEffect(() => {
    if (
      nestedReplyList.state === true &&
      commentId === nestedReplyList.commentId
    ) {
      setOpenNestedReplyList(true)
    }
  }, [nestedReplyList])

  const { data: nestedReplyData, isLoading } = useQuery(
    ['getNestedReplyData', recordId, commentId],
    () => getReply(recordId, 0, commentId),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <div ref={scrollRef} className="mt-3 mb-4 w-full">
      <div className="rounded-lg bg-grey-2 p-3">
        <div className="flex">
          <p className="text-xs font-medium">{writer ? writer : '익명'}</p>
          <p className="mx-1.5 text-xs font-normal text-grey-5">
            {getCreatedDate(createdAt)}
          </p>
        </div>
        {imageUrl !== null && (
          <div className="relative my-2.5 aspect-square w-[130px] rounded-2xl">
            <img
              className="aspect-square w-full rounded-2xl object-cover"
              src={imageUrl}
              alt="user-selected-record-image"
            />
          </div>
        )}
        <p className="mt-1.5 w-full whitespace-pre-wrap break-words text-xs font-normal leading-normal text-grey-8">
          {text}
        </p>
      </div>
      <div>
        <div className="mt-2 flex w-full justify-between">
          <button
            onClick={() =>
              setInputMode({
                mode: INPUT_MODE.NESTEDREPLY,
                recordId,
                parentId: commentId,
              })
            }
            className="cursor-pointer bg-transparent text-xs text-grey-5"
          >
            답글달기
          </button>
          <div>
            {user?.data === writer && (
              <button
                onClick={onClickUpdateComment}
                className="cursor-pointer bg-transparent text-xs text-grey-5"
              >
                수정
              </button>
            )}
            {(recordwriter === user?.data || writer === user?.data) && (
              <button
                onClick={() => setDeleteAlert(true)}
                className="cursor-pointer bg-transparent text-xs text-sub-1"
              >
                삭제
              </button>
            )}
            {user?.data !== undefined && user?.data !== writer && (
              <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                신고
              </button>
            )}
          </div>
        </div>

        {numOfSubComment > 0 && (
          <div className="mt-2.5 mb-4">
            <button
              onClick={() => setOpenNestedReplyList((prev) => !prev)}
              className="flex cursor-pointer bg-transparent text-[12px] leading-none text-primary-2"
            >
              <p className="mr-1">
                {openNestedReplyList ? <Arrow_Up_icon /> : <Arrow_Down_icon />}
              </p>
              답글 {numOfSubComment > 999 ? '999' : numOfSubComment}개
            </button>
          </div>
        )}

        {openNestedReplyList && (
          <Suspense>
            <NestedReplyList
              nestedReplyData={
                nestedReplyData && nestedReplyData.data.commentList
              }
              isLoading={isLoading}
              recordwriter={recordwriter}
              recordId={recordId}
              parentId={commentId}
            />
          </Suspense>
        )}
      </div>
      {deleteAlert && (
        <Suspense>
          <Alert
            visible={deleteAlert}
            mainMessage={<>댓글을 삭제하시겠습니까?</>}
            subMessage={<>삭제 후 복구는 불가능해요.</>}
            cancelMessage="아니오"
            confirmMessage="예"
            onClose={() => setDeleteAlert(false)}
            onCancel={() => setDeleteAlert(false)}
            onConfirm={() => {
              onDeleteReply()
            }}
            danger={true}
          />
        </Suspense>
      )}
    </div>
  )
}
