import { getReply } from '@apis/reply'
import Spinner from '@components/Spinner'
import { useUser } from '@react-query/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { CommentData } from 'types/replyData'
import { getCreatedDate } from './getCreatedDate'

export default function NestedReplyList({
  recordwriter,
  recordId,
  parentId,
}: {
  recordwriter: string | undefined
  recordId: string | undefined
  parentId: number
  numOfSubComment: number
}) {
  const { user } = useUser()
  const [nestedCommentList, setNestedCommentList] = useState<
    CommentData[] | null
  >(null)

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['getNestedReplyData', recordId, parentId],
    () => getReply(recordId, 0, parentId),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (isError) {
      alert('답글 불러오기에 실패했습니다.')
    }
    if (isSuccess) {
      setNestedCommentList([...data.data.commentList])
    }
  }, [data, isSuccess])

  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner size="small" />
        </div>
      )}
      {nestedCommentList !== null &&
        nestedCommentList.map((item, index) => (
          <div key={index} className="mb-4 pr-[3.5rem]">
            <div className="rounded-lg bg-grey-2 p-3" key={index}>
              <div className="flex">
                <p className="text-xs font-medium">
                  {item.writer ? item.writer : '익명'}
                </p>
                <p className="mx-1.5 text-xs font-normal text-grey-5">
                  {getCreatedDate(item.createdAt)}
                </p>
              </div>
              {item.imageUrl !== null && (
                <div className="relative my-2.5 aspect-square w-[130px] rounded-2xl">
                  <img
                    className="aspect-square w-full rounded-2xl object-cover"
                    src={item.imageUrl}
                    alt="user-selected-record-image"
                  />
                </div>
              )}
              <p className="mt-1.5 text-xs font-normal leading-normal text-grey-8">
                {item.content}
              </p>
            </div>
            <div className="mt-1.5 flex w-full justify-end">
              <div>
                {user?.data === item.writer && (
                  <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                    수정
                  </button>
                )}
                {recordwriter === user?.data && (
                  <button className="cursor-pointer bg-transparent text-xs text-sub-1">
                    삭제
                  </button>
                )}
                {user?.data !== undefined && user?.data !== item.writer && (
                  <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                    신고
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
