import { useQuery } from '@tanstack/react-query'
import { getRecordByMonthYear } from '@apis/myRecord'
import { getFormattedDateWithMonthYear } from '@utils/getFormattedDate'
import { getMonthYearDetail } from '@pages/MyRecord/Calendar/getCalendarDetail'
import { useState } from 'react'

export const useMyRecordByMonthYear = () => {
  const today = new Date()
  const [monthYear, setMonthYear] = useState(
    getMonthYearDetail(new Date(today))
  )

  const { data = null, isLoading } = useQuery(
    [monthYear.month, monthYear.year],
    async () =>
      await getRecordByMonthYear(
        getFormattedDateWithMonthYear(monthYear.year, monthYear.month)
      ),
    {
      retry: false,
    }
  )

  return {
    recordsWithMonthYear: data?.data.writtenRecordDayDto,
    isLoading,
    today: { ...getMonthYearDetail(today), day: today.getDate() },
    monthYear,
    setMonthYear,
  }
}
