import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LocalStorage } from '@utils/localStorage'
import { PREVIOUS_URL } from '@assets/constant/others'
import { SessionStorage } from '@utils/sessionStorage'

type StorageType = 'sessionStorage' | 'localStorage'

export const usePreviousUrlWithStorage = (type: StorageType) => {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/collect' || pathname === '/') {
      if (type === 'localStorage') {
        LocalStorage.set(PREVIOUS_URL, pathname)
      } else if (type === 'sessionStorage') {
        SessionStorage.set(PREVIOUS_URL, pathname)
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
