import React, { useEffect, useState } from 'react'

import { TEXT_DETAILS } from '@assets/constant/constant'
import Chip from '@components/Chip'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formDataAtom, recordTypeAtom } from '@store/atom'

import { getChipIconName } from '@pages/DetailRecord/getChipIconName'

type CategorySource = {
  title: string
  iconSrc: string
  choosed: boolean
  id: number
}

type CategoryDataType = {
  celebration: CategorySource[]
  consolation: CategorySource[]
}

type CategoryType = {
  id: number
  name: string
  subcategories: []
}
type CategoryDatas = CategoryType[]

function AddRecordCategory({
  recordCategory,
  isModify,
}: {
  recordCategory: number
  isModify: boolean
}) {
  const [categoryState, setCategoryState] = useState<CategoryDataType | null>(
    null
  )
  const [modifyCategoryState, setModifyCategoryState] =
    useState<CategoryDataType | null>(null)
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const currentRecordType = useRecoilValue(recordTypeAtom)
  const CELEBRATES_ID = 3
  const CONSOLATES_ID = 7

  // useEffect(() => {
  //   setCategoryState(makeCategoryData(data?.data))
  //   if (isModify && data && recordCategory !== undefined) {
  //     const categoryData = makeCategoryData(data?.data)
  //     if (categoryData !== null) {
  //       const earlyModifyData = {
  //         ...categoryData,
  //         [currentRecordType]: categoryData[currentRecordType].map(
  //           (item: CategorySource) => {
  //             return {
  //               ...item,
  //               choosed: item.id === recordCategory,
  //             }
  //           }
  //         ),
  //       }
  //       setModifyCategoryState(earlyModifyData)
  //       setFormData({
  //         ...formData,
  //         selectedCategory:
  //           earlyModifyData[currentRecordType][
  //             currentRecordType === 'celebration'
  //               ? recordCategory - CELEBRATES_ID
  //               : recordCategory - CONSOLATES_ID
  //           ]?.id,
  //       })
  //     }
  //   }
  // }, [data, currentRecordType])
  //data를 만들면 > 이걸 categoryState에 저장 > 화면 리렌더링 > 레코드 타입이 생성됨 > 화면 다시리렌더링

  const makeCategoryData = (data: CategoryDatas) => {
    const CELEBRATION_INDEX = 1
    const CONSOLATION_INDEX = 0
    if (data) {
      const categoryData: CategoryDataType = {
        [TEXT_DETAILS.CELEBRATION]: data[CELEBRATION_INDEX].subcategories.map(
          (category: CategoryType, index: number) => {
            return {
              title: category.name,
              choosed: index === 0,
              id: category.id,
              iconSrc: getChipIconName(category.name),
            }
          }
        ),
        [TEXT_DETAILS.CONSOLATION]: data[CONSOLATION_INDEX].subcategories.map(
          (category: CategoryType, index: number) => {
            return {
              title: category.name,
              choosed: index === 0 && true,
              id: category.id,
              iconSrc: getChipIconName(category.name),
            }
          }
        ),
      }
      return categoryData
    }
    return null
  }

  const handleChooseCurrentCategory = (index: number): void => {
    if (categoryState !== null) {
      const currentState: CategoryDataType | null = categoryState && {
        ...categoryState,
        [currentRecordType]: categoryState[currentRecordType].map(
          (category: CategorySource) => {
            return {
              ...category,
              choosed: category.id === index,
            }
          }
        ),
      }

      setFormData({
        ...formData,
        selectedCategory:
          categoryState[currentRecordType][
            currentRecordType === 'celebration'
              ? index - CELEBRATES_ID
              : index - CONSOLATES_ID
          ].id,
      })

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
        (isModify && modifyCategoryState !== null
          ? modifyCategoryState[currentRecordType]
          : categoryState[currentRecordType]
        ).map((category: CategorySource) => {
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
