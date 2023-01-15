export const getCookie = (name: string): string | null => {
  const cookieData = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  let cookieValue = null
  if (cookieData !== null) {
    cookieValue = cookieData[2]
  }
  return cookieValue
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
