import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import { ReactComponent as MoonIcon } from '@assets/moon_large.svg'

export default function CompletedWithdraw() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <MoonIcon className="mb-10" />
      <p className="mb-4 text-[20px] font-semibold leading-[30px] text-grey-10">
        레코딧 탈퇴가 완료되었습니다
      </p>
      <p className="mb-10 text-center text-[14px] leading-[21px]">
        <span className="text-primary-2">축하와 위로</span>가 필요할 때<br />
        언제든 다시 또 찾아주세요!
      </p>
      <Button disabled={false} property="solid" onClick={() => navigate('/')}>
        레코딧 둘러보기
      </Button>
    </div>
  )
}
