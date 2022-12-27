import { login } from '@apis/auth'
import { useMutation } from '@tanstack/react-query'

export const useAuth = () => {
  const oauthLogin = <AxiosError>(type: string, token: string) => {
    const { data, isLoading } = useMutation({
      mutationFn: () => login(type, token),
      onSuccess: (data) => {
        //TODO: 로그인 페이지로 이동
      },
      onError: (error: AxiosError) => {
        //TODO: 회원가입 진행
      },
    })
  }

  // const signUp =

  return { oauthLogin }
}
