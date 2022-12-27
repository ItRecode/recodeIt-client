/* eslint-disable no-alert, no-console */
const useLocalStorage = () => {
  const getItem = <T>(key: string, defaultValue: T): T => {
    try {
      const value = localStorage.getItem(key)
      return value === null ? defaultValue : (JSON.parse(value) as T)
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  const setItem = <T>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }

  return { getItem, setItem, removeItem }
}

export default useLocalStorage
