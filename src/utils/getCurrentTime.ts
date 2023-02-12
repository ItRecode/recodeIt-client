export const getCurrentTime = {
  date: new Date(),
  getHours() {
    return this.date.getHours()
  },
  getMinutes() {
    const currentMinute = this.date.getMinutes()
    return currentMinute < 10 ? `0${currentMinute}` : currentMinute
  },
}
