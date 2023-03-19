import React from 'react'
import Button from '@components/Button'
import BackButton from '@components/BackButton'
import { useLocation, useNavigate } from 'react-router-dom'

const Withdraw = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <>
      <section id="route-backIcon-button" className="ml-[18px] mt-4">
        <BackButton />
      </section>
      <section id="before-withdraw-info" className="mt-11  px-6 ">
        <h1 className="text-[20px] font-medium leading-[30px]">
          레코딧을 탈퇴하시겠어요?
        </h1>
        <h3 className="mt-10 text-[16px] font-medium leading-[18px]">
          탈퇴 전 <span className="text-sub-1">꼭 확인</span>해주세요
        </h3>
        <ul className="mt-6 flex flex-col gap-5 border-b border-solid border-grey-3 pb-10 text-[12px] leading-[18px] text-grey-7">
          <li className="flex">
            <span>•</span>
            <span>
              지금 탈퇴하시면 그 동안 공유한 레코드와 댓글의
              <p>추억이 모두 사라져요.</p>
            </span>
          </li>
          <li className="flex">
            <span>•</span>
            <span>
              재가입하여도 공유했던 레코드와 댓글의
              <p>추억은 복구되지 않아요.</p>
            </span>
          </li>
          <li>
            <span>•</span>
            <span>탈퇴 후 1주일 동안은 재가입이 불가능해요.</span>
          </li>
        </ul>
      </section>
      <section id="withdraw-navigate-button" className="mt-[180px] px-6">
        <Button
          property="danger"
          onClick={() => navigate('/setting/withdraw/check', { state })}
        >
          탈퇴하기
        </Button>
      </section>
    </>
  )
}

export default Withdraw
