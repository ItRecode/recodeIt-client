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
    registerSession: tempId,
  })
}

export const getIsDuplicatedNickname = (nickname: string) => {
  return baseInstance.get(`/member/nickname`, {
    params: { nickname },
  })
}

export const logout = () => {
  return baseInstance.post(`/member/logout`)
}

export const withdrawUser = () => {
  return baseInstance.delete(`/member/delete`)
}
