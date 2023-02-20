import { getCategory } from '@apis/record'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { parentCategoryID } from './../../types/category'

type categoryDataType = { id: number; name: string }
export const useGetCategory = (parentCategoryId: parentCategoryID) => {
  const [categoryData, setCategoryData] = useState<categoryDataType[]>()
  const { data, isSuccess, refetch } = useQuery(
    ['category', parentCategoryId],
    () => getCategory(parentCategoryId),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  )

  useEffect(() => {
    refetch()
  }, [parentCategoryId])

  useEffect(() => {
    if (isSuccess) setCategoryData(data.data)
  }, [data, isSuccess])

  return { categoryData }
}
