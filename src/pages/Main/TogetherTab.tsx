import React, { Dispatch, SetStateAction } from 'react'

export default function TogetherTab({
  categoryId,
  setCategoryId,
}: {
  categoryId: number
  setCategoryId: Dispatch<SetStateAction<1 | 2>>
}) {
  return (
    <>
      <div className="flex h-full w-full">
        <button
          className="flex h-full w-1/2 border-collapse cursor-pointer items-center justify-center bg-transparent p-0"
          onClick={() => setCategoryId(1)}
        >
          <p
            className={`h-full w-fit border-collapse text-lg font-semibold leading-[50px] ${
              categoryId === 1
                ? 'border-b-2 border-solid border-b-primary-2 text-primary-2'
                : 'text-grey-6'
            }`}
          >
            축하 레코드
          </p>
        </button>
        <button
          className="flex h-full w-1/2 cursor-pointer items-center justify-center bg-transparent p-0"
          onClick={() => setCategoryId(2)}
        >
          <p
            className={`h-full w-fit text-lg font-semibold leading-[50px] ${
              categoryId === 2
                ? 'border-b-2 border-solid border-b-primary-2 text-primary-2'
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
