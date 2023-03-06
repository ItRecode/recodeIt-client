export type keyOfRankingPeriod = 'TOTAL' | 'DAY' | 'WEEK' | 'MONTH'

export type rankingPeriodType = {
  [key in keyOfRankingPeriod]: '하루' | '일주일' | '한 달' | '누적'
}
export const RANKINGPERIOD: rankingPeriodType = {
  DAY: '하루',
  WEEK: '일주일',
  MONTH: '한 달',
  TOTAL: '누적',
}
