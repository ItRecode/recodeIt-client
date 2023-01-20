import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/record'
import { useState } from 'react'

export const useMemoryRecord = () => {
  const queryClient = useQueryClient()
  const [pageParam, setPageParam] = useState(0)

  const queryFnByMemoryRecord = async () => await getMemoryRecord(pageParam)

  const { data: memoryRecord = null, isLoading } = useQuery(
    [QUERY_KEYS.memoryRecord, pageParam],
    queryFnByMemoryRecord,
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  const prefetchMemoryRecord = (nextPageParams: number) => {
    queryClient.prefetchQuery(
      [QUERY_KEYS.memoryRecord, nextPageParams],
      queryFnByMemoryRecord
    )
  }

  return { memoryRecord, isLoading, prefetchMemoryRecord }
}
