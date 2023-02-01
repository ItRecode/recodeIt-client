import Spinner from '@components/Spinner'
import { useIntersect } from '@hooks/useIntersectionObserver'
import { useGetReply } from '@react-query/hooks/useGetReply'
import React from 'react'
import { CommentData } from 'types/replyData'
import ReplyItem from './ReplyItem'

export default function ReplyList({
  recordId,
  Recordwriter,
}: {
  recordId: string | undefined
  Recordwriter: string
}) {
  const { replyList, isLoading, hasNextPage, fetchNextPage } =
    useGetReply(recordId)

  const scrollEndRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  })

  return (
    <section id="replyList" className="px-6">
      <h2 className="text-lg font-semibold">댓글</h2>

      {replyList?.pages.map((page) =>
        page.data.commentList.map((item: CommentData, index: number) => (
          <ReplyItem
            key={item.commentId}
            commentId={item.commentId}
            content={item.content}
            createdAt={item.createdAt}
            imageUrl={item.imageUrl}
            modifiedAt={item.modifiedAt}
            numOfSubComment={item.numOfSubComment}
            recordwriter={Recordwriter}
            writer={item.writer}
            recordId={recordId}
            index={index}
          />
        ))
      )}
      <div ref={scrollEndRef} className="h-10 w-full " />
      {hasNextPage && (
        <div className="flex w-full justify-center">
          <Spinner size="small" />
        </div>
      )}
    </section>
  )
}
