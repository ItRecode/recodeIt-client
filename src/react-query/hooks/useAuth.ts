import { login, signUp } from '@apis/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { IAuth, ISignUp } from 'types/auth'

export const useAuth = () => {
  const navigate = useNavigate()

  const { mutate: oauthLogin } = useMutation(
    ({ type, token }: IAuth) => login({ type, token }),
    {
      onSuccess: () => {
        //TODO: 세션ID값 저장
        navigate('/')
      },
      onError: (error: AxiosError) => {
        //TODO: 회원가입 진행
        const tempId = null
        navigate('/sign-up', {
          state: {
            tempSessionId: tempId,
          },
        })
      },
    }
  )

  const { mutate: oauthSignUp } = useMutation(
    ({ type, tempId, nickname }: ISignUp) => signUp({ type, tempId, nickname })
  )

  return { oauthLogin, oauthSignUp }
}
