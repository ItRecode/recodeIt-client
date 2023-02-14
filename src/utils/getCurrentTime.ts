export const getCurrentTime = {
  date: new Date(),
  getZero(dates: number) {
    return String(dates).padStart(2, '0')
  },
  getDates() {
    const currentMonth = this.date.getMonth() + 1
    const currentDay = this.date.getDate()
    return `${this.date.getFullYear()}-${this.getZero(
      currentMonth
    )}-${this.getZero(currentDay)}`
  },
  getHours() {
    const currentHours = this.date.getHours()
    return this.getZero(currentHours)
  },
  getMinutes() {
    const currentMinute = this.date.getMinutes()
    return this.getZero(currentMinute)
  },
}
