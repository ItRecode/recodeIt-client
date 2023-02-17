export type keyOfRankingPeriod = 'DAY' | 'WEEK' | 'MONTH' | 'TOTAL'

export type rankingPeriodType = {
  [key in keyOfRankingPeriod]:
    | '하루 기준'
    | '일주일 기준'
    | '한 달 기준'
    | '누적 기준'
}
export const RANKINGPERIOD: rankingPeriodType = {
  DAY: '하루 기준',
  WEEK: '일주일 기준',
  MONTH: '한 달 기준',
  TOTAL: '누적 기준',
}
