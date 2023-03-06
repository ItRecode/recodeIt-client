import { deleteReply, getMyReply } from '@apis/reply'
import BackButton from '@components/BackButton'
import Toast from '@components/Toast'
import { ReactComponent as ReplyCheckButton } from '@assets/settings_icon/reply_check.svg'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteReplyType, MyCommentType, MyRepliesType } from 'types/replyData'
import CommentSection from './CommentSection'
import {
  DATE_JOIN_POINT,
  getFormattedDateByString,
} from '@utils/getFormattedDate'

function ManageComment() {
  const navigate = useNavigate()

  const { data, isSuccess } = useQuery(['getMyReply'], () => getMyReply(0, 10))
  const [isDeletedMode, setIsDeleteMode] = useState(false)
  const [toDeleteReply, setToDeleteReply] = useState<DeleteReplyType[]>([])
  const [isToast, setIsToast] = useState(false)

  const handleClickCancel = () => {
    setIsDeleteMode(false)
    setToDeleteReply([])
  }

  const handleClickDetailDelete = (
    commentId: number,
    recordId: string | undefined
  ) => {
    setToDeleteReply([...toDeleteReply, { commentId, recordId }])
  }

  const handleClickDetailDeleteCancel = (currentReplyCommentId: number) => {
    setToDeleteReply(
      toDeleteReply.filter((reply: DeleteReplyType) => {
        if (reply.commentId !== currentReplyCommentId) return reply
      })
    )
  }

  const getToDeleteReply = (
    currentReplyCommentId: number,
    toDeleteReply: DeleteReplyType[],
    reply: MyRepliesType
  ): React.ReactNode => {
    for (let tdr = 0; tdr < toDeleteReply.length; tdr++) {
      if (currentReplyCommentId === toDeleteReply[tdr].commentId) {
        return (
          <ReplyCheckButton
            onClick={() => handleClickDetailDeleteCancel(currentReplyCommentId)}
          />
        )
      }
    }
    return (
      <div
        onClick={() =>
          handleClickDetailDelete(currentReplyCommentId, String(reply.recordId))
        }
        className="h-[18px] w-[18px] rounded-full border border-grey-4"
      />
    )
  }

  const handleClickDeleteReplyButton = (toDeleteReply: DeleteReplyType[]) => {
    const DeleteReplies = async () => {
      await toDeleteReply.forEach((reply, index) => {
        deleteReply(reply.commentId, String(reply.recordId))
        if (index === toDeleteReply.length - 1) {
          setIsToast(true)
        }
      })
    }
    DeleteReplies()
  }
  return (
    <div className="relative px-6">
      {isToast && (
        <Toast
          message={<div>댓글 1개 삭제 완료</div>}
          onClose={() => setIsToast(false)}
          visible={isToast}
        />
      )}
      <div className="sticky top-0 left-0 z-20 mb-4 flex justify-between bg-grey-1 py-4">
        <BackButton />
        {isDeletedMode ? (
          <p
            onClick={handleClickCancel}
            className="cursor-pointer text-xs font-medium text-sub-1"
          >
            취소
          </p>
        ) : (
          <p
            onClick={() => setIsDeleteMode(true)}
            className="cursor-pointer text-xs font-medium text-primary-2"
          >
            선택
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <p className="text-xs font-medium text-grey-6">최신순</p>
      </div>
      <div>
        {isSuccess &&
          data.data.myCommentsDtos?.map((reply: MyRepliesType) => (
            <section
              key={reply.recordId}
              className="mt-4 flex  flex-col items-start pr-4"
            >
              <p className="mb-2">
                {getFormattedDateByString(
                  reply.recordCreatedAt,
                  DATE_JOIN_POINT
                )}
              </p>
              <CommentSection
                recordId={reply.recordId}
                colorName={`bg-${reply.colorName}`}
                title={reply.title}
                writer={'모송'}
                numOfComment={reply.commentsCount}
                iconName={reply.iconName}
              />
              <section className="flex w-full flex-col pl-[56px]">
                <div className="mb-2 flex flex-col gap-2">
                  {reply.myCommentDtos.map(
                    ({
                      content,
                      commentId,
                      nickname,
                      commentCreatedAt,
                    }: MyCommentType) => (
                      <div className="flex items-center" key={commentId}>
                        <div className="mr-2 w-full rounded-[8px] bg-grey-2 p-3">
                          <div className="flex">
                            <p className=" mr-2 text-xs font-medium">
                              {nickname}
                            </p>
                            <p className="text-xs font-normal text-grey-5">
                              {getFormattedDateByString(
                                commentCreatedAt,
                                DATE_JOIN_POINT
                              )}
                            </p>
                          </div>
                          <p className="text-xs font-normal text-grey-8">
                            {content}
                          </p>
                        </div>
                        {isDeletedMode &&
                          getToDeleteReply(commentId, toDeleteReply, reply)}
                      </div>
                    )
                  )}
                </div>
                <p
                  onClick={() => navigate(`/record/${reply.recordId}`)}
                  className="cursor-pointer text-xs font-normal text-grey-7"
                >
                  전체보기
                </p>
              </section>
            </section>
          ))}
      </div>
      {toDeleteReply.length > 0 && (
        <button
          onClick={() => handleClickDeleteReplyButton(toDeleteReply)}
          className="sticky bottom-0 left-0 ml-[-24px] w-[calc(100%+48px)] cursor-pointer bg-sub-10 py-4 font-semibold text-sub-1"
        >{`댓글 삭제 (${toDeleteReply.length}개)`}</button>
      )}
    </div>
  )
}

export default ManageComment
