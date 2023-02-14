import { useEffect } from 'react'
import { LocalStorage } from '@utils/localStorage'
import { PREVIOUS_URL } from '@assets/constant/others'
import { SessionStorage } from '@utils/sessionStorage'

type StorageType = 'sessionStorage' | 'localStorage'

export const useStorage = (type: StorageType) => {
  const currentUrl = window.location.href.split('/')
  useEffect(() => {
    if (currentUrl[3] === 'collect' || currentUrl[3] === '') {
      if (type === 'localStorage') {
        LocalStorage.set(PREVIOUS_URL, currentUrl[3])
      } else if (type === 'sessionStorage') {
        SessionStorage.set(PREVIOUS_URL, currentUrl[3])
      }
    }
    return () => {
      if (type === 'localStorage') {
        LocalStorage.remove(PREVIOUS_URL)
      } else if (type === 'sessionStorage') {
        SessionStorage.remove(PREVIOUS_URL)
      }
    }
  }, [])
}
