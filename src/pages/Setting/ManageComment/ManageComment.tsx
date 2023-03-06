import { deleteReply, getMyReply } from '@apis/reply'
import BackButton from '@components/BackButton'
import { ReactComponent as ReplyCheckButton } from '@assets/settings_icon/reply_check.svg'
import { ReactComponent as CheckBoxButton } from '@assets/settings_icon/check_box.svg'
import { QueryClient, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteReplyType, MyCommentType, MyRepliesType } from 'types/replyData'
import CommentSection from './CommentSection'
import {
  DATE_JOIN_POINT,
  getFormattedDateByString,
} from '@utils/getFormattedDate'
import SmallToast from '@components/SmallToast'
import Loading from '@components/Loading'

function ManageComment() {
  const navigate = useNavigate()

  const { data, isLoading, isSuccess } = useQuery(
    ['getMyReply'],
    () => getMyReply(0, 10),
    {
      refetchOnMount: true,
    }
  )
  const [isDeletedMode, setIsDeleteMode] = useState(false)
  const [toDeleteReply, setToDeleteReply] = useState<DeleteReplyType[]>([])
  const [isToast, setIsToast] = useState(false)
  const [deletedReply, setDeletedReply] = useState(0)

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
      <CheckBoxButton
        onClick={() =>
          handleClickDetailDelete(currentReplyCommentId, String(reply.recordId))
        }
      />
    )
  }

  const queryClient = new QueryClient()

  const handleClickDeleteReplyButton = (toDeleteReply: DeleteReplyType[]) => {
    const DeleteReplies = async () => {
      toDeleteReply.forEach((reply, index) => {
        deleteReply(reply.commentId, String(reply.recordId))
        if (index === toDeleteReply.length - 1) {
          queryClient.invalidateQueries(['getMyReply'])
          setIsDeleteMode(false)
          setDeletedReply(toDeleteReply.length)
          setToDeleteReply([])
          setIsToast(true)
        }
      })
    }
    DeleteReplies()
  }

  const getWidth = () => {
    if (window.innerWidth >= 420) {
      return 'w-[420px]'
    }
    return 'w-full'
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="relative h-full px-6">
      {isToast && (
        <SmallToast onClose={() => setIsToast(false)}>
          <div className="fixed top-[50%] left-[50%] w-[161px] translate-x-[-81.5px] rounded-full bg-sub-10  py-3 px-5 font-semibold leading-6 text-sub-1">
            {`댓글 ${deletedReply}개 삭제 완료`}
          </div>
        </SmallToast>
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
          className={`fixed bottom-0 left-[50%] translate-x-[-50%] ${getWidth()} cursor-pointer bg-sub-10 py-4 font-semibold text-sub-1`}
        >{`댓글 삭제 (${toDeleteReply.length}개)`}</button>
      )}
    </div>
  )
}

export default ManageComment
