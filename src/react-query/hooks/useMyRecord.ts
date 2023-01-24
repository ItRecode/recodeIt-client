import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getRecordByDate } from '@apis/record'
import { getDate } from '@utils/getDate'

export const useMyRecord = () => {
  const today = new Date()

  const { data: records = null, isLoading } = useQuery(
    [QUERY_KEYS.todayRecord],
    async () =>
      await getRecordByDate({ date: getDate(today), page: 0, size: 1 }),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  return {
    todayRecord: records?.data.recordByDateDtos[0],
    isLoading,
  }
}
