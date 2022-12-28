import React, { useState } from 'react'
import Celebrate from '@assets/celebrate.svg'
import Happy from '@assets/happy.svg'
import Cake from '@assets/cake.svg'
import Love from '@assets/love.svg'
import Consolate from '@assets/consolate.svg'
import { TEXT_DETAILS } from '@assets/constant/constant'
import Chip from '@components/Chip'

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

function AddRecordCategory({
  currentRecordType,
}: {
  currentRecordType: keyof CategoryType
}) {
  const categoryData: CategoryType = {
    [TEXT_DETAILS.CELEBRATION]: [
      { title: '축하해주세요', choosed: true, id: 0, iconSrc: Celebrate },
      { title: '행복해요', choosed: false, id: 1, iconSrc: Happy },
      { title: '기념일이에요', choosed: false, id: 2, iconSrc: Cake },
      { title: '연애중이에요', choosed: false, id: 3, iconSrc: Love },
    ],
    [TEXT_DETAILS.CONSOLATION]: [
      { title: '위로해주세요', choosed: true, id: 0, iconSrc: Consolate },
    ],
  }

  const [categoryState, setCategoryState] = useState<CategoryType>(categoryData)

  const handleChooseCurrentCategory = (index: number): void => {
    const currentState = {
      ...categoryState,
      [currentRecordType]: categoryData[currentRecordType].map(
        (category: CategorySource) => ({
          ...category,
          choosed: category.id === index,
        })
      ),
    }
    setCategoryState(currentState)
  }

  return (
    <div className="mt-6 mb-10 flex flex-wrap gap-x-2 gap-y-4">
      {categoryState[currentRecordType].map((category: CategorySource) => {
        return (
          <div
            key={category.id}
            onClick={() => handleChooseCurrentCategory(category.id)}
          >
            <Chip
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
