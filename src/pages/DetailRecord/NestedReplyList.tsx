import { getReply } from '@apis/reply'
import Spinner from '@components/Spinner'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { CommentData } from 'types/replyData'
import NestedReplyItem from './NestedReplyItem'

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
          <NestedReplyItem
            key={index}
            recordwriter={recordwriter}
            content={item.content}
            createdAt={item.createdAt}
            imageUrl={item.imageUrl}
            writer={item.writer}
            commentId={item.commentId}
            recordId={recordId}
            parentId={parentId}
            modifiedAt={item.modifiedAt}
          />
        ))}
    </>
  )
}
