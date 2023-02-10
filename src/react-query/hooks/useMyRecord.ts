import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getRecordByDate } from '@apis/record'
import { getFormattedDate } from '@utils/getFormattedDate'
import { getMonthYearDetail } from '@pages/MyRecord/Calendar/getCalendarDetail'

export const useMyRecord = () => {
  const today = new Date()
  const currentMonthYear = getMonthYearDetail(new Date(today))

  const {
    data: records = null,
    isLoading,
    refetch,
  } = useQuery(
    [QUERY_KEYS.todayRecord],
    async () =>
      await getRecordByDate({
        date: getFormattedDate(today, 'hyphen'),
        page: 0,
        size: 1,
      }),
    {
      retry: false,
    }
  )

  return {
    todayRecord: records?.data.recordByDateDtos[0],
    isLoading,
    refetch,
    monthYear: currentMonthYear,
  }
}
