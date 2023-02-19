import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getRecordByDate } from '@apis/record'
import { getFormattedDate } from '@utils/getFormattedDate'
import { getMonthYearDetail } from '@pages/MyRecord/Calendar/getCalendarDetail'
import { useState } from 'react'

export const useRecordsByMonthYear = () => {
  const today = new Date()
  const [monthYear, setMonthYear] = useState(
    getMonthYearDetail(new Date(today))
  )

  // TODO: 우선 임시로 아무 API 연결해놓았습니당 :) ㅎㅎ
  const { data: records = null, isLoading } = useQuery(
    [QUERY_KEYS.myRecord, monthYear.month, monthYear],
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
    monthYearRecords: records?.data.recordByDateDtos[0],
    isLoading,
    monthYear,
    setMonthYear,
  }
}
