import BackButton from '@components/BackButton'
import Button from '@components/Button'
import React, { useState } from 'react'

function FeedbackMail() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  return (
    <>
      <div className="px-6">
        <header className="pt-4">
          <BackButton />
        </header>

        <section id="notice" className="mt-10">
          <div className="text-lg font-semibold">
            <p>여러분의 소리를 듣기 위해</p>
            <p>레코딧은 항상 열려있어요!</p>
            <p>
              <span className="text-primary-2">자유롭게 피드백</span>을
              보내주세요!
            </p>
          </div>
          <div className="mt-4 text-xs leading-normal text-grey-7">
            <p>레코딧을 사용하며 겪은 불편함이 있으신가요?</p>
            <p>또는 텐져스에게 전달하고 싶은 내용이 있으신가요?</p>
            <p>남겨주시는 내용은 한글자도 빼놓지 않고 꼼꼼히 살펴볼게요.</p>
          </div>
        </section>
        <section id="title" className="mt-10">
          <p className="text-xs font-semibold text-primary-2">
            레코딧 피드백 제목
          </p>
          <div className="mt-4 flex items-center">
            <input
              className="w-full border-b border-solid border-grey-4  py-1.5 text-grey-9 outline-none placeholder:text-grey-4 focus:placeholder:text-transparent"
              placeholder="제목을 작성해주세요."
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
            <span className="absolute right-6 text-xs text-grey-4">
              {subject.length}/20
            </span>
          </div>
        </section>
        <section id="body" className="mt-[57px]">
          <p className="text-xs font-semibold text-primary-2">
            레코딧 피드백 내용
          </p>
          <div className="relative flex items-end justify-end">
            <textarea
              className="mt-4 h-[130px] w-full resize-none rounded-lg bg-grey-2 p-4 leading-normal text-grey-9 outline-0 placeholder:text-grey-5 focus:placeholder:text-transparent"
              placeholder="피드백 내용을 자유롭게 작성해주세요."
              maxLength={200}
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <span className="absolute bottom-2 right-4 text-xs font-normal leading-none text-grey-4">
              {body.length}/200
            </span>
          </div>
        </section>
      </div>
      <div className="absolute bottom-10 w-full cursor-pointer px-6">
        <Button property="solid">피드백 보내기</Button>
      </div>
    </>
  )
}

export default FeedbackMail
