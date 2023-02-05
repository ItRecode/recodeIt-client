import React from 'react'
import { ReactComponent as NotFoundIcon } from '@assets/moon_big.svg'
import Button from '@components/Button'
import { useNavigate } from 'react-router-dom'

export default function NotRecord() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <NotFoundIcon className=" mb-10" />
      <p className="mb-4 font-semibold text-grey-10">삭제된 레코드 입니다</p>
      <p className="mb-10 text-xs font-medium">
        해당 레코드는 삭제 되었으니 다른 레코드에서 만나요.
      </p>
      <Button disabled={false} property="primary" onClick={() => navigate('/')}>
        레코딧으로 이동
      </Button>
    </div>
  )
}
