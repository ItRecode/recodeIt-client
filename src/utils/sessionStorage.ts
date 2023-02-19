export const SessionStorage = {
  get(key: string): string | null {
    return sessionStorage.getItem(key)
  },

  set(key: string, value: string) {
    sessionStorage.setItem(key, value)
  },

  remove(key: string) {
    sessionStorage.removeItem(key)
  },

  clear() {
    sessionStorage.clear()
  },
}
