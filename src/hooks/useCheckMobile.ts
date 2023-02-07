import { useEffect, useState } from 'react'

export const useCheckMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function detectMobileDevice(agent: string): boolean {
      const mobileRegex = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ]

      return mobileRegex.some((mobile) => agent.match(mobile))
    }

    setIsMobile(detectMobileDevice(window.navigator.userAgent))
  }, [])

  return { isMobile }
}
