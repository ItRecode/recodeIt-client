import { useUser } from '@react-query/hooks/useUser'
import React, { useEffect, useState } from 'react'
import { CommentData } from 'types/replyData'
import { getCreatedDate } from './getCreatedDate'

export default function ReplyItem({
  content,
  createdAt,
  imageUrl,
  Recordwriter,
  // modifiedAt,
  // numOfSubComment,
  writer,
}: CommentData) {
  const [nickNameResult, setNickNameResult] = useState<string | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (user?.data !== null) {
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
    <div className="mt-3">
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
          <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
            답글달기
          </button>
          <div>
            {nickNameResult === 'myComment' && (
              <>
                <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
                  수정
                </button>
                <button className="cursor-pointer bg-grey-1 text-xs text-sub-1">
                  삭제
                </button>
              </>
            )}
            {nickNameResult === 'myRecordOtherReply' && (
              <>
                <button className="cursor-pointer bg-grey-1 text-xs text-sub-1">
                  삭제
                </button>
                <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
                  신고
                </button>
              </>
            )}
            {nickNameResult === 'otherRecordOtherReply' && (
              <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
                신고
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
