export const getCreatedDate = (createdAt: string) => {
  const currentTime = new Date().getTime()
  const createdTime = new Date(new Date(createdAt)).getTime()
  // diffenceTime = 초 (s)
  const differenceTime = (currentTime - createdTime) / 1000

  // 게시물 작성 1분 미만 (60s)
  if (differenceTime < 60) {
    const second = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.round(-differenceTime),
      'second'
    )
    return second
  }

  // 게시물 작성 1시간 미만 (60 * 60s)
  if (differenceTime < 60 * 60) {
    const minute = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.round(-differenceTime / 60),
      'minute'
    )
    return minute
  }

  // 게시물 작성 하루 미만 (60 * 60 * 24s)
  if (differenceTime < 60 * 60 * 24) {
    const hour = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.round(-differenceTime / (60 * 60)),
      'hour'
    )
    return hour
  }

  // 게시물 작성 일주일 미만 (60 * 60 * 24 * 7s)
  if (differenceTime < 60 * 60 * 24 * 7) {
    const day = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.round(-differenceTime / (60 * 60 * 24)),
      'day'
    )
    return day
  }

  // 게시물 작성 일주일 이상 작성 날짜,시간 반환
  if (differenceTime > 24) {
    const date = new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: false,
    }).format(createdTime)
    return date
  }
  return ''
}
