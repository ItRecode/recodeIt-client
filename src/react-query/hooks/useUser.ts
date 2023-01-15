import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@apis/user'
import { deleteCookie, getCookie } from '@utils/cookies'
import { SESSION } from '@assets/constant/constant'

export const useUser = () => {
  const getUserInfoQueryFn = async () => {
    if (!getCookie(SESSION)) {
      return null
    }

    return await getUserInfo()
  }

  const { data: user = null } = useQuery(
    [QUERY_KEYS.user],
    getUserInfoQueryFn,
    {
      onError: () => {
        deleteCookie(SESSION)
      },
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  return { user }
}
