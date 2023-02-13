export const getCurrentTime = {
  date: new Date(),
  getZero(dates: number) {
    return dates < 10 ? `0${dates}` : dates
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
