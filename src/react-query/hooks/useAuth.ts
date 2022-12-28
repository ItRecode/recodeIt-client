import { login, signUp } from '@apis/auth'
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
        navigate('/')
      },
      onError: (error: AxiosError) => {
        //TODO: 회원가입 진행
        const { data } = error.response as AxiosResponse

        navigate('/sign-up', {
          state: {
            tempSessionId: data,
          },
        })
      },
    }
  )

  const { mutate: oauthSignUp } = useMutation(
    async ({ type, tempId, nickname }: ISignUp) =>
      await signUp({ type, tempId, nickname })
  )

  return { oauthLogin, oauthSignUp }
}
