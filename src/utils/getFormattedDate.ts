export const DATE_JOIN_POINT = 'point'

export const getFormattedDate = (date: Date, type: string) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  if (type === DATE_JOIN_POINT) {
    return `${year}.${month}.${day}`
  }

  return `${year}-${month}-${day}`
}

export const getFormattedDateByString = (date: string, type: string) => {
  if (type === DATE_JOIN_POINT) {
    return date.split('T')[0].replaceAll('-', '.')
  }
  return date.split('T')[0]
}

export const getFormattedDateWithMonthYear = (year: number, month: number) => {
  return `${year}-${month.toString().padStart(2, '0')}`
}
