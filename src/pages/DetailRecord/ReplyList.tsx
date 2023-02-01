import Spinner from '@components/Spinner'
import { useIntersect } from '@hooks/useIntersectionObserver'
import { useGetReply } from '@react-query/hooks/useGetReply'
import { scrollTarget } from '@store/atom'
import React, { useEffect, useRef } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
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

  const scrollTargetId = useRecoilValue(scrollTarget)
  const resetSrollTarget = useResetRecoilState(scrollTarget)

  const scrollResetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollTargetId.scrollReset) {
      scrollResetRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      resetSrollTarget()
    }
  }, [scrollTargetId])

  return (
    <section id="replyList" className="px-6" ref={scrollResetRef}>
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
