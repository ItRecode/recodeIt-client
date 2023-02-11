import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/record'
import { useState } from 'react'

export const useMemoryRecord = () => {
  const [pageCount, setPageCount] = useState(0)

  const {
    data: memoryRecord = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.memoryRecord, pageCount],
    queryFn: async ({ pageParam = 0 }) => await getMemoryRecord(pageParam),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.totalPage > config.params.memoryRecordPage + 1) {
        return config.params.memoryRecordPage + 1
      }
      return null
    },
    retry: false,
    onSuccess: ({ pages }) => {
      if (pages[0]) {
        setPageCount(pages[0].data.totalCount)
      }
    },
  })

  return {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
