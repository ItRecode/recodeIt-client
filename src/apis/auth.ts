import { baseInstance } from './instance'

export const login = (type: string, token: string) => {
  return baseInstance.post(`/member/oauth/login/${type}`, {
    oauth_token: token,
  })
}

// export const signUp = ()
