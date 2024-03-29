import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import { ReactComponent as HeartIcon } from '@assets/heart_large.svg'
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg'
import { getFormattedDate } from '@utils/getFormattedDate'

export default function WithdrawSignUp() {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <>
      <CloseIcon
        className="ml-6 mt-4 cursor-pointer"
        onClick={() => navigate('/', { replace: true })}
      />
      <div className="flex h-full flex-col items-center justify-center px-5">
        <HeartIcon className="mb-10" />
        <p className="mb-14 text-center text-[20px] font-semibold leading-[30px] text-grey-10">
          <span className="text-primary-2">
            {getFormattedDate(new Date(state.date), 'point')}{' '}
          </span>
          이후로
          <br />
          재가입이 가능해요
        </p>
        <Button
          disabled={false}
          property="solid"
          onClick={() => navigate('/', { replace: true })}
        >
          레코딧 둘러보기
        </Button>
      </div>
    </>
  )
}
