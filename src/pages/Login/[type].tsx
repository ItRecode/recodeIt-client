import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@react-query/hooks/useAuth'

export default function OauthLogin() {
  const location = useLocation()
  const { oauthLogin } = useAuth()
  const authorizationCode = location.search.split('=')[1]

  useEffect(() => {
    if (authorizationCode) {
      const loginType = location.pathname.split('/')[2]
      oauthLogin({
        type: loginType,
        token: authorizationCode,
      })
    }
  }, [authorizationCode])

  return <div>Loading..</div>
}
