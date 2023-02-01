import { getReply } from '@apis/reply'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetReply = <T>(recordId: T) => {
  const {
    data: replyList = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
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
  })

  return { replyList, isLoading, hasNextPage, fetchNextPage }
}
