import React from 'react'
import { ReactComponent as NotFoundIcon } from '@assets/moon_big.svg'
import Button from '@components/Button'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <NotFoundIcon className=" mb-10" />
      <p className="mb-4 font-semibold text-grey-10">
        해당 페이지를 찾지 못했어요
      </p>
      <p className="mb-10 text-xs font-medium">
        주소가 잘못되었거나 제공되지 않는 페이지예요.
      </p>
      <Link to={'/'}>
        <Button disabled={false} property="primary">
          레코딧으로 이동
        </Button>
      </Link>
    </div>
  )
}
