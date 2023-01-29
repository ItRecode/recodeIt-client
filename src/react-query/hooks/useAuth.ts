import { login, signUp } from '@apis/auth'
import { UNAUTHORIZED_CODE } from '@assets/constant/constant'
import { useMutation } from '@tanstack/react-query'
import { LocalStorage } from '@utils/localStorage'
import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { IAuth, ISignUp } from 'types/auth'

export const useAuth = () => {
  const navigate = useNavigate()
  const redirectUrl = LocalStorage.get('redirectUrl') as string

  const redirectPage = () => {
    if (!redirectUrl) {
      navigate('/', { replace: true })
      return
    }

    navigate(redirectUrl, { replace: true })
    LocalStorage.remove('redirectUrl')
  }

  const { mutate: oauthLogin } = useMutation(
    async ({ type, token }: IAuth) => await login({ type, token }),
    {
      onSuccess: () => {
        redirectPage()
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === UNAUTHORIZED_CODE) {
          const { data } = error.response as AxiosResponse
          const loginType = error.response?.config.url?.split('/')[4]

          navigate('/sign-up', {
            state: {
              tempSessionId: data.registerSession,
              loginType,
            },
          })
          return
        }

        navigate('/login')
      },
    }
  )

  const { mutate: oauthSignUp, isLoading } = useMutation(
    async ({ type, tempId, nickname }: ISignUp) =>
      await signUp({ type, tempId, nickname }),
    {
      onSuccess: () => {
        redirectPage()
      },
      onError: () => {
        navigate('/login')
      },
    }
  )

  return { oauthLogin, oauthSignUp, isLoading }
}
