import React, { useEffect, useState } from 'react'

import { TEXT_DETAILS } from '@assets/constant/constant'
import Chip from '@components/Chip'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formDataAtom, recordTypeAtom } from '@store/atom'
import {
  Cake,
  Celebrate,
  Consolate,
  Happy,
  Love,
  Depress,
  Sympathy,
  MySide,
} from '@assets/chip_icon'
import { getCategory } from '@apis/record'
import { useQuery } from '@tanstack/react-query'

type CategorySource = {
  title: string
  iconSrc: string
  choosed: boolean
  id: number
}

type CategoryType = {
  celebration: CategorySource[]
  consolation: CategorySource[]
}

type BigCategory = {
  id: number
  name: string
  subcategories: []
}
type CategoryDatas = BigCategory[]

function AddRecordCategory({
  currentRecordType,
  recordCategory,
  isModify,
}: {
  currentRecordType: keyof CategoryType
  recordCategory: number
  isModify: boolean
}) {
  const [categoryState, setCategoryState] = useState<CategoryType | null>(null)
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const recordType = useRecoilValue(recordTypeAtom)
  const CELEBRATES = 3
  const CONSOLATES = 7
  const { data } = useQuery(['getCategory'], getCategory, {
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    handleChooseCurrentCategory(currentRecordType === 'celebration' ? 3 : 7)
  }, [recordType])

  useEffect(() => {
    if (isModify) {
      if (recordCategory !== undefined) {
        const madeData = makeCategoryData(data?.data)
        if (madeData !== null) {
          const modifyData = {
            ...madeData,
            [recordType]: madeData[recordType].map(
              (category: CategorySource) => {
                return {
                  ...category,
                  choosed: category.id === recordCategory,
                }
              }
            ),
          }
          setCategoryState(modifyData)
          setFormData({
            ...formData,
            selectedCategory:
              modifyData[recordType][
                recordType === 'celebration'
                  ? recordCategory - CELEBRATES
                  : recordCategory - CONSOLATES
              ]?.id,
          })
        }
      }
    } else {
      setCategoryState(makeCategoryData(data?.data))
    }
    // }
  }, [data])

  const makeCategoryData = (data: CategoryDatas) => {
    const CELEBRATION = 1
    const CONSOLATION = 0
    if (data) {
      const categoryData: CategoryType = {
        [TEXT_DETAILS.CELEBRATION]: data[CELEBRATION].subcategories.map(
          (category: BigCategory, index: number) => {
            return {
              title: category.name,
              choosed: index === 0,
              id: category.id,
              iconSrc: getIconSrc(category.id),
            }
          }
        ),
        [TEXT_DETAILS.CONSOLATION]: data[CONSOLATION].subcategories.map(
          (category: BigCategory, index: number) => {
            return {
              title: category.name,
              choosed: index === 0 && true,
              id: category.id,
              iconSrc: getIconSrc(category.id),
            }
          }
        ),
      }
      return categoryData
    }
    return null
  }

  const getIconSrc = (id: number): string => {
    switch (id) {
      case 3:
        return Celebrate
      case 4:
        return Happy
      case 5:
        return Cake
      case 6:
        return Love
      case 7:
        return Consolate
      case 8:
        return Depress
      case 9:
        return Sympathy
      case 10:
        return MySide
      default:
        return Celebrate
    }
  }

  const handleChooseCurrentCategory = (index: number): void => {
    const currentState: CategoryType | null = categoryState && {
      ...categoryState,
      [currentRecordType]:
        categoryState !== null &&
        categoryState[currentRecordType].map((category: CategorySource) => {
          return {
            ...category,
            choosed: category.id === index,
          }
        }),
    }

    if (categoryState !== null) {
      setFormData({
        ...formData,
        selectedCategory:
          categoryState[currentRecordType][
            currentRecordType === 'celebration'
              ? index - CELEBRATES
              : index - CONSOLATES
          ].id,
      })
    }
    if (currentState !== null && categoryState !== null) {
      setCategoryState(currentState)
    }
  }

  return (
    <div
      className={`${
        isModify && 'pointer-events-none'
      } mt-6 mb-10 flex flex-wrap gap-x-2 gap-y-4`}
    >
      {categoryState !== null &&
        categoryState[currentRecordType].map((category: CategorySource) => {
          return (
            <div
              key={category.id}
              onClick={() => handleChooseCurrentCategory(category.id)}
            >
              <Chip
                isModify={isModify}
                type="button"
                active={category.choosed}
                message={category.title}
                icon={category.iconSrc}
              />
            </div>
          )
        })}
    </div>
  )
}

export default AddRecordCategory
