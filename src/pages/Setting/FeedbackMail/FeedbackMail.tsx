import BackButton from '@components/BackButton'
import Button from '@components/Button'
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Toast from '@components/Toast'

function FeedbackMail() {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const formRef = useRef<HTMLFormElement>(null)

  const handleChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subject.length > 20) return
    setSubject(e.target.value)
  }
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (subject === '' || body === '') return
    const {
      REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID,
      REACT_APP_EMAILJS_PUBLIC_KEY,
    } = process.env

    if (formRef.current !== null) {
      emailjs
        .sendForm(
          REACT_APP_EMAILJS_SERVICE_ID as string,
          REACT_APP_EMAILJS_TEMPLATE_ID as string,
          e.currentTarget,
          REACT_APP_EMAILJS_PUBLIC_KEY as string
        )
        .then(
          () => {
            setIsOpenToast(true)
            setSubject('')
            setBody('')
          },
          (error) => {
            throw error
          }
        )
    }
  }
  return (
    <>
      {isOpenToast && (
        <Toast
          visible={true}
          timeLimit={2}
          message={
            <>
              <div className="mt-6 font-semibold">
                <p className="whitespace-nowrap">
                  <span className="text-primary-2">피드백 전송</span>이
                </p>
                <p className="whitespace-nowrap">완료되었어요</p>
              </div>
              <div className="mt-4 text-xs font-medium leading-normal text-grey-8">
                <p className="whitespace-nowrap">
                  더 편리한 이용을 하실 수 있도록
                </p>
                <p className="whitespace-nowrap">빠르게 개선할게요!</p>
              </div>
            </>
          }
          onClose={() => setIsOpenToast(false)}
          hasSecondMessage={false}
          size="big"
        />
      )}
      <form ref={formRef} onSubmit={(e) => sendEmail(e)}>
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
                name="subject"
                type="text"
                className="w-full border-b border-solid border-grey-4  py-1.5 text-grey-9 outline-none placeholder:text-grey-4 focus:placeholder:text-transparent"
                placeholder="제목을 작성해주세요."
                onChange={(e) => handleChangeSubjectInput(e)}
                value={subject}
                maxLength={20}
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
                name="body"
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
        <div
          className={`${
            window.innerHeight > 680 ? 'absolute' : 'my-10 block'
          } bottom-10 w-full cursor-pointer px-6`}
        >
          <Button
            property="solid"
            type="submit"
            disabled={subject === '' || body === ''}
            active={subject !== '' && body !== ''}
          >
            피드백 보내기
          </Button>
        </div>
      </form>
    </>
  )
}

export default FeedbackMail
