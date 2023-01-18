import React from 'react'
import { IRecordMemoryDataItem } from 'types/recordData'
import recordIcons from '@assets/record_icons'
import { useNavigate } from 'react-router-dom'

export default function MemoryRecordItem({
  recordId,
  title,
  iconName,
  colorName,
  commentList,
}: IRecordMemoryDataItem) {
  const navigate = useNavigate()
  const background_color = `bg-${colorName}`
  const RecordIcon = recordIcons[`${iconName}`]

  return (
    <>
      <div className="ml-[2px] mt-6 flex items-center justify-between">
        <span
          className="cursor-pointer text-sm font-semibold"
          onClick={() => navigate(`/record/${recordId}`)}
        >
          {title}
        </span>
        <span
          className="cursor-pointer text-xs text-primary-2"
          onClick={() => navigate(`/record/${recordId}`)}
        >
          전체보기
        </span>
      </div>
      <div className="mt-4 flex cursor-pointer gap-4 overflow-x-scroll scroll-smooth">
        <div onClick={() => navigate(`/record/${recordId}`)}>
          <div
            className={`${background_color} flex h-[86px] w-[86px] items-center rounded-2xl`}
          >
            <RecordIcon className="flex aspect-square w-full" />
          </div>
        </div>
        <div className="flex gap-2">
          {commentList.map(({ commentId, content }) => (
            <div
              key={commentId}
              className="h-[86px] w-40 rounded-2xl bg-grey-2 py-4 px-5"
            >
              <div className="line-clamp h-[54px] w-full overflow-hidden leading-[18px]">
                <span className="text-xs">{content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}