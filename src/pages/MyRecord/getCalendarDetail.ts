export interface MonthYear {
  month: number
  year: number
  startDayOfMonth: number
  lastDayOfMonth: number
}

export const getMonthYearDetail = (initialDate: Date): MonthYear => {
  const year = initialDate.getFullYear()
  const month = initialDate.getMonth()
  const startDayOfMonth = new Date(year, month, 1).getDay()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

  return { year, month, startDayOfMonth, lastDayOfMonth }
}
