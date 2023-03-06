import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/myRecord'
import { useState } from 'react'

export const useMemoryRecord = () => {
  const [date, setDate] = useState('')

  const {
    data: memoryRecord = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.memoryRecord, date],
    queryFn: async ({ pageParam = 0 }) =>
      await getMemoryRecord(pageParam, date),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.totalPage > config.params.memoryRecordPage + 1) {
        return config.params.memoryRecordPage + 1
      }
      return null
    },
  })

  return {
    memoryRecord,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    setDate,
  }
}
