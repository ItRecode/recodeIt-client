import { useEffect } from 'react'
import { LocalStorage } from '@utils/localStorage'
import { PREVIOUS_URL } from '@assets/constant/others'

export const useLocalStorage = () => {
  const currentUrl = window.location.href.split('/')
  useEffect(() => {
    if (currentUrl[3] === 'collect' || currentUrl[3] === '') {
      LocalStorage.set(PREVIOUS_URL, currentUrl[3])
    }
    return () => {
      LocalStorage.remove(PREVIOUS_URL)
    }
  }, [])
}
