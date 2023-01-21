import { getReply } from '@apis/reply'
import Spinner from '@components/Spinner'
import { useIntersect } from '@hooks/useIntersectionObserver'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CommentData } from 'types/replyData'
import ReplyItem from './ReplyItem'

const useUrlQuery = () => {
  const { pathname, search } = useLocation()
  const query = new URLSearchParams(search)
  return { pathname, query }
}

export default function ReplyList({
  recordId,
  Recordwriter,
}: {
  recordId: string | undefined
  Recordwriter: string
}) {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getReplyData', recordId],
    queryFn: ({ pageParam = 0 }) => getReply(recordId, pageParam),
    getNextPageParam: (lastPage): number | null => {
      if (lastPage.data.totalPage > lastPage.config.params.page) {
        return lastPage.config.params.page + 1
      }
      return null
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    refetchInterval: 180000,
  })

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  })

  const { query } = useUrlQuery()
  const [scrollCommentId, setScrollCommentId] = useState<number | null>(null)

  useEffect(() => {
    const commentIdInQuery = query.get('commentId')

    if (commentIdInQuery) {
      setScrollCommentId(parseInt(commentIdInQuery, 10))
    }
  }, [])

  return (
    <section id="reply" className="px-6">
      <h2 className="text-lg font-semibold">댓글</h2>

      {data?.pages.map((page) =>
        page.data.commentList.map((item: CommentData) => (
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
            isScroll={item.commentId === scrollCommentId}
          />
        ))
      )}
      <div ref={ref} className="h-10 w-full " />
      {hasNextPage && (
        <div className="flex w-full justify-center">
          <Spinner size="small" />
        </div>
      )}
    </section>
  )
}
