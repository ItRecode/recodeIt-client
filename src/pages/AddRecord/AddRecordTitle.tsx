import React from 'react'

export default function AddRecordTitle({
  title,
  isModify,
}: {
  title: string
  isModify?: boolean
}) {
  return (
    <div
      className={`mb-6 text-lg font-semibold ${
        isModify ? 'text-grey-7' : 'text-grey-10'
      } `}
    >
      {title}
    </div>
  )
}
