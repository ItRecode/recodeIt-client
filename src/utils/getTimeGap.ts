export const getTimeGap = (time: number): number => {
  return Math.floor((new Date().getTime() - time) / 1000)
}
