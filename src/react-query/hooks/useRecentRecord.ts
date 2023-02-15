import { getRecentRecordData } from '@apis/record'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GetCurrentTime } from '@utils/getCurrentTime'

export const useRecentRecord = () => {
  const getCurrentTime = new GetCurrentTime()
  const dateBehind = `${getCurrentTime.getHours()}:${getCurrentTime.getMinutes()}`
  const dateTime = `${getCurrentTime.getDates()} ${dateBehind}`

  const {
    data: recentRecord = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    remove,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.recentRecord],
    queryFn: async ({ pageParam = 0 }) =>
      await getRecentRecordData(pageParam, dateTime),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.totalPages > config.params.page + 1) {
        return config.params.page + 1
      }
      return null
    },
    retry: false,
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
