export const getCreatedDate = (created_at: string) => {
  const current_time = new Date().getTime()
  const created_time = new Date(new Date(created_at)).getTime()
  const difference_time = current_time - created_time / 1000

  if (difference_time < 60) {
    const second = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.floor(-difference_time),
      'second'
    )
    return second
  }
  if (difference_time / 60 < 60) {
    const minute = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.floor(-difference_time / 60),
      'minute'
    )
    return minute
  }
  if (difference_time < 24) {
    const hour = new Intl.RelativeTimeFormat('ko-KR').format(
      Math.floor(-difference_time / 3600),
      'hour'
    )
    return hour
  }
  if (difference_time > 24) {
    const date = new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: false,
    }).format(created_time)
    return date
  }
  return ''
}
