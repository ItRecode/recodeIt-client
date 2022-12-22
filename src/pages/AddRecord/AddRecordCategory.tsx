import React from 'react'
import { RecordType } from './AddRecord'
import Celebrate from '@assets/celebrate.svg'
import Happy from '@assets/happy.svg'
import Cake from '@assets/cake.svg'
import Love from '@assets/love.svg'

type userProps = {
  currentRecordType: RecordType
}

function AddRecordCategory({ currentRecordType }: userProps) {
  console.log(currentRecordType)
  const categoryData: any = {
    celebration: [
      { title: '축하해주세요', iconSrc: Celebrate },
      { title: '행복해요', iconSrc: Happy },
      { title: '기념일이에요', iconSrc: Cake },
      { title: '연애중이에요', iconSrc: Love },
    ],
    consolation: [{ title: '위로해주세요', iconSrc: '@assets/consolate' }],
  }

  return (
    <div className="flex mb-10">
      {categoryData[currentRecordType].map(
        (category: { title: string; iconSrc: string }, index: number) => {
          return (
            <button className="p-4 bg-primary-2 mr-2" key={index}>
              <img src={category.iconSrc} alt="" />
              {category.title}
            </button>
          )
        }
      )}
    </div>
  )
}

export default AddRecordCategory
