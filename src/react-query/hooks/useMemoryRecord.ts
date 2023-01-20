import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getMemoryRecord } from '@apis/record'

export const useMemoryRecord = () => {
  const {
    data: memoryRecord = null,
    refetch,
    isLoading,
  } = useQuery(
    [QUERY_KEYS.memoryRecord],
    async ({ pageParam = 0 }) => await getMemoryRecord(pageParam),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
  // console.log(memoryRecord?.data)

  return { memoryRecord, refetch, isLoading }
}
