import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '@react-query/hooks/useAuth'

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default function OauthLogin() {
  const query = useQuery()
  const { type } = useParams()
  const { oauthLogin } = useAuth()
  const authorizationCode = query.get('code')

  useEffect(() => {
    if (authorizationCode) {
      oauthLogin({
        type: type as string,
        token: decodeURIComponent(authorizationCode),
      })
    }
  }, [authorizationCode])

  return <div>Loading..</div>
}
