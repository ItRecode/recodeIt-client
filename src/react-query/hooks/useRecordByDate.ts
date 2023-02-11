import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getRecordByDate } from '@apis/record'
import { getFormattedDate } from '@utils/getFormattedDate'
import { getMonthYearDetail } from '@pages/MyRecord/Calendar/getCalendarDetail'
import { useState } from 'react'

export const useRecordByDate = () => {
  const [todayRecordId, setTodayRecordId] = useState<number | null>(null)
  const today = new Date()
  const currentMonthYear = getMonthYearDetail(new Date(today))

  const { data: records = null, isLoading } = useQuery(
    [QUERY_KEYS.myRecord, todayRecordId],
    async () =>
      await getRecordByDate({
        date: getFormattedDate(today, 'hyphen'),
        page: 0,
        size: 1,
      }),
    {
      retry: false,
      onSuccess: ({ data }) => {
        if (data.totalCount) {
          setTodayRecordId(data.recordByDateDtos[0].recordId)
        } else {
          setTodayRecordId(null)
        }
      },
    }
  )

  return {
    todayRecord: records?.data.recordByDateDtos[0],
    isLoading,
    monthYear: currentMonthYear,
  }
}
