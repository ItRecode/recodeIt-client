import BackButton from '@components/BackButton'
import Button from '@components/Button'
import Chip from '@components/Chip'
import MoreButton from '@components/MoreButton'
import React from 'react'

export default function DetailRecord() {
  return (
    <div className="w-full">
      <header className="h-[60px]" />
      <nav className="flex justify-between px-6">
        <BackButton />
        <MoreButton />
      </nav>
      <section id="title" className="mt-7 flex flex-col px-6">
        <div className="flex justify-between">
          <p className="flex items-center text-2xl font-semibold">
            제목은 최대 10자
          </p>
          <Chip active={true} icon={null} message={'축하해주세요'}></Chip>
        </div>
        <div className="mt-4 flex">
          <p className="text-[14px]">닉네임</p>
          <p className="px-4 text-xs text-grey-5">2022.12.01 12:00</p>
        </div>
      </section>
      <section
        id="record_context"
        className="flex w-full flex-col items-center"
      >
        <div className="my-4 h-[338px] w-[338px] rounded-2xl bg-primary-3"></div>
        <Button>공유하기</Button>
        <div className="my-6 w-[327px] text-[14px]">
          <p>레코드 내용은 200자까지 보이도록 합니다.</p>
          <p>레코드 내용은 200자까지 보이도록 합니다.</p>
        </div>
      </section>
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
      </section>
      <footer></footer>
    </div>
  )
}
