import BackButton from '@components/BackButton'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CommentSection from './CommentSection'

interface CommentType {
  writer: string
  title: string
  createdAt: string
  id: number
}

function ManageComment() {
  const navigate = useNavigate()
  const COMMENTS = [
    { id: 1, writer: '모승', title: '실험인데용', createdAt: '2022.10.01' },
    { id: 2, writer: '모승', title: '실험인데용', createdAt: '2022.10.01' },
    { id: 3, writer: '모승', title: '실험인데용', createdAt: '2022.10.01' },
  ]
  const recordId = 270
  const ALL_POSTS = [1, 2, 3, 4, 5]

  return (
    <div className="px-6 pt-4">
      <div className="flex justify-between pb-8">
        <BackButton />
        <p className="cursor-pointer text-xs font-medium text-primary-2">
          선택
        </p>
      </div>
      <div className="flex justify-end">
        <p>최신순</p>
      </div>
      <div>
        {ALL_POSTS.map((src) => (
          <section key={src} className="mt-4 flex  flex-col items-start pr-4">
            <p className="mb-4">2022.12.01</p>
            <CommentSection
              parentCategoryId={1}
              recordId={350}
              colorName={`bg-icon-purple`}
              title={'실험인데요'}
              writer={'모송'}
              numOfComment={5}
              iconName={'gift'}
            />
            <section className="flex w-full flex-col gap-2 pl-[56px]">
              {COMMENTS.map(({ writer, title, createdAt, id }: CommentType) => (
                <div key={id} className="w-full rounded-[8px] bg-grey-2 p-3">
                  <div className="flex">
                    <p className=" mr-2 text-xs font-medium">{writer}</p>
                    <p className="text-xs font-normal text-grey-5">
                      {createdAt}
                    </p>
                  </div>
                  <p className="text-xs font-normal text-grey-8">{title}</p>
                </div>
              ))}
              <p
                onClick={() => navigate(`/record/${recordId}`)}
                className="cursor-pointer text-xs font-normal text-grey-7"
              >
                전체보기
              </p>
            </section>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ManageComment
