const DATE_JOIN_POINT = 'point'

export const getFormattedDate = (date: Date, type: string) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  if (type === DATE_JOIN_POINT) {
    return `${year}.${month}.${day}`
  }

  return `${year}-${month}-${day}`
}
