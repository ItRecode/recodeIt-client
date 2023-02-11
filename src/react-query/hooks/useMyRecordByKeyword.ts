import { getRecordByKeyword } from '@apis/myRecord'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useMyRecordByKeyword = (stateKeyword: string) => {
  const [keywordWithQuery, setKeywordWithQuery] = useState(stateKeyword || '')

  const {
    data: myRecordByKeyword = null,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.searchRecord, keywordWithQuery],
    queryFn: async ({ pageParam = 0 }) =>
      await getRecordByKeyword(pageParam, keywordWithQuery),
    getNextPageParam: (lastPage): number | null => {
      const { data, config } = lastPage
      if (data.totalPage > config.params.page + 1) {
        return config.params.page + 1
      }
      return null
    },
    retry: false,
  })

  return {
    setKeywordWithQuery,
    myRecordByKeyword,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
