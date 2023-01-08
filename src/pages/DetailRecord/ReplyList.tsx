import React from 'react'

export default function ReplyList() {
  return (
    <section id="reply" className="px-6">
      <p>댓글</p>
      <div className="mt-1.5">
        <div className="rounded-lg bg-grey-2 p-3">
          <div className="flex">
            <p className="text-xs font-medium">익명</p>
            <p className="mx-1.5 text-xs font-normal text-grey-5">0시간 전</p>
          </div>
          <p className="mt-1.5 text-xs font-normal text-grey-8">
            댓글이 노출됩니다.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer bg-grey-1 text-xs text-[#F83636]">
            신고
          </button>
          <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
            수정
          </button>
        </div>
      </div>
      <div className="mt-1.5">
        <div className="rounded-lg bg-grey-2 p-3">
          <div className="flex">
            <p className="text-xs font-medium">익명</p>
            <p className="mx-1.5 text-xs font-normal text-grey-5">0시간 전</p>
          </div>
          <p className="mt-1.5 text-xs font-normal text-grey-8">
            댓글이 노출됩니다.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer bg-grey-1 text-xs text-[#F83636]">
            신고
          </button>
          <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
            수정
          </button>
        </div>
      </div>
      <div className="mt-1.5">
        <div className="rounded-lg bg-grey-2 p-3">
          <div className="flex">
            <p className="text-xs font-medium">익명</p>
            <p className="mx-1.5 text-xs font-normal text-grey-5">0시간 전</p>
          </div>
          <p className="mt-1.5 text-xs font-normal text-grey-8">
            댓글이 노출됩니다.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer bg-grey-1 text-xs text-[#F83636]">
            신고
          </button>
          <button className="cursor-pointer bg-grey-1 text-xs text-grey-5">
            수정
          </button>
        </div>
      </div>
    </section>
  )
}
