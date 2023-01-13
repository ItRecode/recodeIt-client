import { IAuth, ISignUp } from 'types/auth'
import { baseInstance } from './instance'

export const login = ({ type, token }: IAuth) => {
  return baseInstance.post(`/member/oauth/login/${type}`, {
    oauthToken: token,
  })
}

export const signUp = ({ type, tempId, nickname }: ISignUp) => {
  return baseInstance.post(`/member/oauth/register/${type}`, {
    nickname: nickname,
    register_session: tempId,
  })
}

export const getIsDuplicatedNickname = (nickname: string) => {
  return baseInstance.get(`/member/nickname`, {
    params: { nickname },
  })
}
