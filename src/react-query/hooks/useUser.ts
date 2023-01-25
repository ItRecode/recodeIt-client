import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@apis/user'

export const useUser = () => {
  const {
    data: user = null,
    refetch,
    isLoading,
  } = useQuery([QUERY_KEYS.user], async () => await getUserInfo(), {
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return { user, refetch, isLoading }
}
