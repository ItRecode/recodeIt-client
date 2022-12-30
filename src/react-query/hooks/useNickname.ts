import { getIsDuplicatedNickname } from '@apis/auth'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useGetDuplicateNickname = (
  nickname: string,
  isChecked: boolean
) => {
  const { data: isDuplicate, isSuccess } = useQuery(
    [QUERY_KEYS.nickname, isChecked],
    async () => await getIsDuplicatedNickname(nickname)
  )

  return { isDuplicate, isSuccess }
}
