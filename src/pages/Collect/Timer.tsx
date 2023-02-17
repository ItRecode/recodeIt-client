import { RESET_TIME } from '@assets/constant/collect'
import { getTimeGap } from '@utils/getTimeGap'
import { SessionStorage } from '@utils/sessionStorage'
import React from 'react'

function Timer() {
  const getTimer = Number(SessionStorage.get('timer')) as number
  const timeGapByTimer = getTimeGap(getTimer) as number
  RESET_TIME
  const REMAIN_TIME = RESET_TIME - timeGapByTimer
  return (
    <p className="text-[10px] font-medium leading-4">
      {REMAIN_TIME / 60 >= 1 ? `0${Math.floor(REMAIN_TIME / 60)}` : '00'}:
      {String(REMAIN_TIME % 60).padStart(2, '0')}
    </p>
  )
}

export default Timer
