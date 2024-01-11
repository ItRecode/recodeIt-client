import { RESET_TIME } from '@assets/constant/collect'
import { getTimeGap } from '@utils/getTimeGap'
import { SessionStorage } from '@utils/sessionStorage'
import React from 'react'

function Timer() {
  const getTimer = Number(SessionStorage.get('resetTime')) as number
  const timeGapByTimer = getTimeGap(getTimer) as number
  const REMAIN_TIME = RESET_TIME - timeGapByTimer
  const fullTimeDivide60 = REMAIN_TIME % 60

  return (
    <div className="flex w-[full] text-center text-[10px] font-medium leading-4">
      <p className="inline-block">
        {REMAIN_TIME / 60 >= 1 ? `0${Math.floor(REMAIN_TIME / 60)}` : '00'} :{' '}
      </p>
      <p className="inline-block w-[7px] text-right">{`${Math.floor(
        fullTimeDivide60 / 10
      )}`}</p>
      <p className="inline-block w-[7px] text-left">{fullTimeDivide60 % 10}</p>
    </div>
  )
}

export default Timer
