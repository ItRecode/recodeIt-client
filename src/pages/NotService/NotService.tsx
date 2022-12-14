import React from 'react'
import { ReactComponent as NotServiceIcon } from '@assets/umbrella_big.svg'
import Button from '@components/Button'
import { useNavigate } from 'react-router-dom'

export default function NotService() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <NotServiceIcon className=" mb-10" />
      <p className="mb-4 font-semibold text-grey-10">
        아직 준비 중인 서비스예요
      </p>
      <p className="mb-10 text-xs font-medium">서비스가 완성되면 만나요.</p>
      <Button disabled={false} onClick={() => navigate(-1)} property="primary">
        이전 페이지로
      </Button>
    </div>
  )
}
