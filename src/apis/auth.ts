import { IAuth, ISignUp } from 'types/auth'
import { baseInstance } from './instance'

export const login = async ({ type, token }: IAuth) => {
  return await baseInstance.post(`/member/oauth/login/${type}`, {
    oauth_token: token,
  })
}

export const signUp = async ({ type, tempId, nickname }: ISignUp) => {
  return await baseInstance.post(`/member/oauth/register/{${type}`, {
    nickname: nickname,
    register_session: tempId,
  })
}
