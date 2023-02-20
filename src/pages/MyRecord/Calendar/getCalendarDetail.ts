export interface MonthYear {
  month: number
  year: number
  startDayOfMonth: number
  lastDayOfMonth: number
}

export const getMonthYearDetail = (initialDate: Date): MonthYear => {
  const year = initialDate.getFullYear()
  const month = initialDate.getMonth() + 1
  const startDayOfMonth = new Date(year, month - 1, 1).getDay()
  const lastDayOfMonth = new Date(year, month, 0).getDate()

  return { year, month, startDayOfMonth, lastDayOfMonth }
}
