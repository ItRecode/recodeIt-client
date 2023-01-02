import { getIsDuplicatedNickname } from '@apis/auth'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useGetDuplicateNickname = (nickname: string) => {
  const { data } = useQuery(
    [QUERY_KEYS.nickname, nickname],
    async () => await getIsDuplicatedNickname(nickname)
  )

  return { isDuplicate: data?.data }
}
