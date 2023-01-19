import { INPUT_MODE } from '@assets/constant/constant'
import { useUser } from '@react-query/hooks/useUser'
import { DetailPageInputMode } from '@store/atom'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { CommentData } from 'types/replyData'
import { getCreatedDate } from './getCreatedDate'
import NestedReplyList from './NestedReplyList'
import { ReactComponent as Arrow_Down_icon } from '@assets/detail_page_icon/arrow_down.svg'
import { ReactComponent as Arrow_Up_icon } from '@assets/detail_page_icon/arrow_up.svg'

export default function ReplyItem({
  content,
  createdAt,
  imageUrl,
  Recordwriter,
  // modifiedAt,
  numOfSubComment,
  writer,
  commentId,
  recordId,
}: CommentData) {
  const [nickNameResult, setNickNameResult] = useState<string | null>(null)
  const { user } = useUser()
  const [isOpenNestedReplyList, setIsOpenNestedReplyList] = useState(false)

  const setInputMode = useSetRecoilState(DetailPageInputMode)

  useEffect(() => {
    if (user?.data !== undefined) {
      if (user?.data === writer) {
        setNickNameResult('myComment')
      } else {
        if (Recordwriter === user?.data) {
          setNickNameResult('myRecordOtherReply')
        } else {
          setNickNameResult('otherRecordOtherReply')
        }
      }
    }
  }, [Recordwriter, writer, user])

  return (
    <div className="mt-3 mb-4 w-full">
      <div className="rounded-lg bg-grey-2 p-3">
        <div className="flex">
          <p className="text-xs font-medium">{writer ? writer : '익명'}</p>
          <p className="mx-1.5 text-xs font-normal text-grey-5">
            {getCreatedDate(createdAt)}
          </p>
        </div>
        {imageUrl !== null && (
          <div className="relative my-2.5 aspect-square w-[130px] rounded-2xl">
            <img
              className="aspect-square w-full rounded-2xl object-cover"
              src={imageUrl}
              alt="user-selected-record-image"
            />
          </div>
        )}
        <p className="mt-1.5 text-xs font-normal leading-normal text-grey-8">
          {content}
        </p>
      </div>
      <div>
        <div className="mt-2 flex w-full justify-between">
          <button
            onClick={() =>
              setInputMode({
                mode: INPUT_MODE.NESTEDREPLY,
                recordId,
                parentId: commentId,
              })
            }
            className="cursor-pointer bg-transparent text-xs text-grey-5"
          >
            답글달기
          </button>
          <div>
            {nickNameResult === 'myComment' && (
              <>
                <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                  수정
                </button>
                <button className="cursor-pointer bg-transparent text-xs text-sub-1">
                  삭제
                </button>
              </>
            )}
            {nickNameResult === 'myRecordOtherReply' && (
              <>
                <button className="cursor-pointer bg-transparent text-xs text-sub-1">
                  삭제
                </button>
                <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                  신고
                </button>
              </>
            )}
            {nickNameResult === 'otherRecordOtherReply' && (
              <button className="cursor-pointer bg-transparent text-xs text-grey-5">
                신고
              </button>
            )}
          </div>
        </div>

        {numOfSubComment > 0 && (
          <div className="mt-2.5 mb-4">
            <button
              onClick={() => setIsOpenNestedReplyList((prev) => !prev)}
              className="flex cursor-pointer bg-transparent text-[12px] leading-none text-primary-2"
            >
              <p className="mr-1">
                {isOpenNestedReplyList ? (
                  <Arrow_Up_icon />
                ) : (
                  <Arrow_Down_icon />
                )}
              </p>
              답글 {numOfSubComment > 999 ? '999' : numOfSubComment}개
            </button>
          </div>
        )}

        {isOpenNestedReplyList && (
          <NestedReplyList
            Recordwriter={Recordwriter}
            recordId={recordId}
            parentId={commentId}
            numOfSubComment={numOfSubComment}
          />
        )}
      </div>
    </div>
  )
}
