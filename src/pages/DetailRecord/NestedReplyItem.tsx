import { deleteReply } from '@apis/reply'
import Alert from '@components/Alert'
import { useUser } from '@react-query/hooks/useUser'
import { DetailPageInputMode, modifyComment } from '@store/detailPageAtom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { CommentData } from 'types/replyData'
import { getCreatedDate } from './getCreatedDate'

interface NestedReplyType extends Omit<CommentData, 'numOfSubComment'> {
  parentId: number
}
export default function NestedReplyItem({
  recordwriter,
  content,
  createdAt,
  imageUrl,
  writer,
  commentId,
  recordId,
  parentId,
}: NestedReplyType) {
  const { user } = useUser()
  const [deleteAlert, setDeleteAlert] = useState(false)
  const setInputMode = useSetRecoilState(DetailPageInputMode)
  const setModifyCommentDto = useSetRecoilState(modifyComment)

  const queryClient = useQueryClient()

  const { mutate: onDeleteNestedReply } = useMutation(
    (commentId: number) => deleteReply(commentId, recordId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getReplyData', recordId])
        queryClient.invalidateQueries([
          'getNestedReplyData',
          recordId,
          parentId,
        ])
        setDeleteAlert(false)
      },
    }
  )

  return (
    <div className="mb-4 pr-[3.5rem]">
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
        <p className="mt-1.5 whitespace-pre-wrap break-words text-xs font-normal leading-normal text-grey-8">
          {content.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n')}
        </p>
      </div>

      <div className="mt-1.5 flex w-full justify-end">
        <div>
          {user?.data === writer && (
            <button
              onClick={() => {
                setInputMode((prev) => {
                  return { ...prev, mode: 'update', parentId: parentId }
                })
                setModifyCommentDto({
                  commentId: commentId,
                  content: content,
                  imageUrl: imageUrl ? imageUrl : '',
                })
              }}
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
      {deleteAlert && (
        <Alert
          visible={deleteAlert}
          mainMessage={<>댓글을 삭제하시겠습니까?</>}
          subMessage={<>삭제 후 복구는 불가능해요.</>}
          cancelMessage="아니오"
          confirmMessage="예"
          onClose={() => setDeleteAlert(false)}
          onCancel={() => setDeleteAlert(false)}
          onConfirm={() => {
            onDeleteNestedReply(commentId)
          }}
          danger={true}
        />
      )}
    </div>
  )
}
