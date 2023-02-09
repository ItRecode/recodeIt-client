import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { formDataAtom } from '@store/atom'
import Category from '@components/Category'
import { parentCategoryID } from 'types/category'

function AddRecordCategory({
  parentCategoryId,
  recordCategory,
  isModify,
}: {
  parentCategoryId: parentCategoryID
  recordCategory: number
  isModify: boolean
}) {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const [choosedCategoryId, setChoosedCategoryId] = useState(0)

  useEffect(() => {
    setFormData({
      ...formData,
      selectedCategory: choosedCategoryId,
    })
  }, [choosedCategoryId])

  useEffect(() => {
    if (isModify) {
      setChoosedCategoryId(recordCategory)
    }
  }, [])
  return (
    <div
      className={`${
        isModify && 'pointer-events-none'
      } mt-6 mb-10 flex flex-wrap gap-x-2 gap-y-4`}
    >
      {recordCategory && (
        <Category
          isModify={isModify}
          slider={false}
          parentCategoryId={parentCategoryId}
          choosedCategoryId={choosedCategoryId}
          setChoosedCategoryId={setChoosedCategoryId}
        />
      )}
    </div>
  )
}

export default AddRecordCategory
