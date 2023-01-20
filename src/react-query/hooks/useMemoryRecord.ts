import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/record'

export const useMemoryRecord = () => {
  const {
    data: memoryRecord = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.memoryRecord],
    queryFn: async ({ pageParam = 0 }) => await getMemoryRecord(pageParam),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.hasNextPage && !data.isLastPage) {
        return config.params.pageNum + 1
      }
      return null
    },
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
