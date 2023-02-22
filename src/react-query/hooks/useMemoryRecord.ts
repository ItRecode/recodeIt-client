import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/myRecord'

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
      if (data.totalPage > config.params.memoryRecordPage + 1) {
        return config.params.memoryRecordPage + 1
      }
      return null
    },
    refetchOnMount: true,
  })

  return {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
