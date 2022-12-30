import { login, signUp } from '@apis/auth'
import useLocalStorage from '@hooks/useLocalStorage'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { IAuth, ISignUp } from 'types/auth'

export const useAuth = () => {
  const navigate = useNavigate()

  const { mutate: oauthLogin } = useMutation(
    async ({ type, token }: IAuth) => await login({ type, token }),
    {
      onSuccess: () => {
        //TODO: 세션ID값 저장
        // useLocalStorage('sessionId', '')
        navigate('/')
      },
      onError: (error: AxiosError) => {
        const { data } = error.response as AxiosResponse
        const loginType = error.response?.config.url?.split('/')[4]

        navigate('/sign-up', {
          state: {
            tempSessionId: data.register_session,
            loginType,
          },
        })
      },
    }
  )

  const { mutate: oauthSignUp } = useMutation(
    async ({ type, tempId, nickname }: ISignUp) =>
      await signUp({ type, tempId, nickname }),
    {
      onSuccess: () => {
        //TODO: 세션ID값 저장
        // useLocalStorage('sessionId', '')
        navigate('/')
      },
      onError: () => {
        navigate('/login')
      },
    }
  )

  return { oauthLogin, oauthSignUp }
}
