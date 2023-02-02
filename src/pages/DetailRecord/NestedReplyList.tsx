import Spinner from '@components/Spinner'
import React from 'react'
import { CommentData } from 'types/replyData'
import NestedReplyItem from './NestedReplyItem'

export default function NestedReplyList({
  nestedReplyData,
  isLoading,
  recordwriter,
  recordId,
  parentId,
}: {
  nestedReplyData: CommentData[]
  isLoading: boolean
  recordwriter: string | undefined
  recordId: string | undefined
  parentId: number
}) {
  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner size="small" />
        </div>
      )}

      {nestedReplyData !== undefined &&
        nestedReplyData.map((item: CommentData, index: number) => (
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
