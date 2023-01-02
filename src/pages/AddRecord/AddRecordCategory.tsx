import React, { useState } from 're
import Depress from '@assets/depress.svg'
import Sympathy from '@assets/sympathy.svg'
import MySide from '@assets/mySide.svg'

import { TEXT_DETAILS } from '@assets/constant/constant'
import Chip from '@components/Chip'
import { useRecoilState } from 'recoil'
import { formDataAtom } from '@store/atom'
import { Cake, Celebrate, Consolate, Happy, Love } from '@assets/chip_icon'


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
      { title: '축하해주세요', choosed: true, id: 3, iconSrc: Celebrate },
      { title: '행복해요', choosed: false, id: 4, iconSrc: Happy },
      { title: '기념일이에요', choosed: false, id: 5, iconSrc: Cake },
      { title: '연애중이에요', choosed: false, id: 6, iconSrc: Love },
    ],
    [TEXT_DETAILS.CONSOLATION]: [
      { title: '위로해주세요', choosed: true, id: 7, iconSrc: Consolate },
      { title: '우울해요', choosed: false, id: 8, iconSrc: Depress },
      { title: '공감이 필요해요', choosed: false, id: 9, iconSrc: Sympathy },
      { title: '내편이 되어주세요', choosed: false, id: 10, iconSrc: MySide },
    ],
  }

  const [categoryState, setCategoryState] = useState<CategoryType>(categoryData)
  const [formData, setFormData] = useRecoilState(formDataAtom)

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

    setFormData({
      ...formData,
      selectedCategory:
        categoryState[currentRecordType][
          currentRecordType === 'celebration' ? index - 3 : index - 7
        ].id,
    })
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
