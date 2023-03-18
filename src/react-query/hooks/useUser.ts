import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserInfo } from '@apis/user'
import { logout, withdrawUser } from '@apis/auth'

export const useUser = () => {
  const queryClient = useQueryClient()

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

  const logoutUser = async () => {
    await logout()
    queryClient.setQueriesData([QUERY_KEYS.user], null)
  }

  const deleteUser = async () => {
    await withdrawUser()
    queryClient.setQueriesData([QUERY_KEYS.user], null)
  }

  return { user, refetch, isLoading, logoutUser, deleteUser }
}
