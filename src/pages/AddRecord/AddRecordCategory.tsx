import React from 'react'
import Celebrate from '@assets/celebrate.svg'
import Happy from '@assets/happy.svg'
import Cake from '@assets/cake.svg'
import Love from '@assets/love.svg'
import Consolate from '@assets/consolate.svg'
import { TEXT_DETAILS } from '../../assets/constant/constant'

function AddRecordCategory({
  currentRecordType,
}: {
  currentRecordType: string
}) {
  const categoryData: any = {
    [TEXT_DETAILS.CELEBRATION]: [
      { title: '축하해주세요', iconSrc: Celebrate },
      { title: '행복해요', iconSrc: Happy },
      { title: '기념일이에요', iconSrc: Cake },
      { title: '연애중이에요', iconSrc: Love },
    ],
    [TEXT_DETAILS.CONSOLATION]: [{ title: '위로해주세요', iconSrc: Consolate }],
  }

  return (
    <div className="mb-10 flex">
      {categoryData[currentRecordType].map(
        (category: { title: string; iconSrc: string }, index: number) => {
          return (
            <button className="mr-2 bg-primary-2 p-4" key={`category-${index}`}>
              <img src={category.iconSrc} alt={`category-${index}-icon`} />
              {category.title}
            </button>
          )
        }
      )}
    </div>
  )
}

export default AddRecordCategory
