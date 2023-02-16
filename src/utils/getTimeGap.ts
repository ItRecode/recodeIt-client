export const getTimeGap = (time: number): number | false => {
  const timeGapByTimer = Math.floor((new Date().getTime() - time) / 1000)
  return timeGapByTimer
}
