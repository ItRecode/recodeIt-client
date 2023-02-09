import { CELEBRATION_ID, CONSOLATION_ID } from '@assets/constant/constant'
import React, { Dispatch, SetStateAction } from 'react'
import { parentCategoryID } from 'types/category'

export default function ParentCategoryTab({
  parentCategoryId,
  setParentCategoryId,
  isModify,
}: {
  parentCategoryId: number
  setParentCategoryId: Dispatch<SetStateAction<parentCategoryID>>
  isModify?: boolean
}) {
  return (
    <>
      <div className="flex h-full w-full">
        <button
          disabled={isModify}
          className={`flex h-full w-1/2 border-collapse items-center justify-center bg-transparent p-0 ${
            isModify ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => setParentCategoryId(CELEBRATION_ID)}
        >
          <p
            className={`h-full w-fit border-collapse text-lg font-semibold leading-[50px] ${
              parentCategoryId === CELEBRATION_ID
                ? `border-b-2 border-solid ${
                    isModify
                      ? 'text-grey-7'
                      : 'border-b-primary-2 text-primary-2'
                  }`
                : 'text-grey-6'
            }`}
          >
            축하 레코드
          </p>
        </button>
        <button
          disabled={isModify}
          className={`flex h-full w-1/2 cursor-pointer items-center justify-center bg-transparent p-0 ${
            isModify ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => setParentCategoryId(CONSOLATION_ID)}
        >
          <p
            className={`h-full w-fit text-lg font-semibold leading-[50px] ${
              parentCategoryId === CONSOLATION_ID
                ? `border-b-2 border-solid ${
                    isModify
                      ? 'text-grey-7'
                      : 'border-b-primary-2 text-primary-2'
                  }`
                : 'text-grey-6'
            }`}
          >
            위로 레코드
          </p>
        </button>
      </div>
      <hr className="m-0 h-[1px] border-0 bg-grey-3" />
    </>
  )
}
