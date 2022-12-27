import { login } from '@apis/auth'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@react-query/queryKeys'

export const useAuth = () => {
  const oauthLogin = (type: string, token: string) => {
    const data = useQuery([QUERY_KEYS.user], () => login(type, token), {
      onSuccess: (data) => {
        //TODO: 로그인 진행
        console.log(data)
      },
      onError: (error) => {
        //TODO: 회원가입 진행
        console.log(error)
      },
    })
  }

  // const signUp =

  return { oauthLogin }
}
