import { getRecentRecordData } from '@apis/record'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useRecentRecord = () => {
  const [pageCount, setPageCount] = useState(0)

  const {
    data: recentRecord = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    remove,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.recentRecord, pageCount],
    queryFn: async ({ pageParam = 0 }) => await getRecentRecordData(pageParam),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.totalPages > config.params.page + 1) {
        return config.params.page + 1
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

  const reset = () => {
    remove()
    refetch({ refetchPage: (page, index) => index === 0 })
  }

  return {
    recentRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    reset,
  }
}
