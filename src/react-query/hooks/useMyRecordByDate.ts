import { getRecordOnToday } from '@apis/myRecord'
import { QUERY_KEYS } from '@react-query/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useMyRecordByDate = () => {
  const [todayRecordId, setTodayRecordId] = useState<number | null>(null)

  const { data: record = null, isLoading } = useQuery(
    [QUERY_KEYS.myRecord, todayRecordId],
    async () => await getRecordOnToday(),
    {
      retry: false,
      onSuccess: ({ data }) => {
        if (data) {
          setTodayRecordId(data.recordId)
        } else {
          setTodayRecordId(null)
        }
      },
    }
  )

  return {
    todayRecord: record?.data,
    isLoading,
  }
}
