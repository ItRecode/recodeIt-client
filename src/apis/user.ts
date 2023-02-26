import { baseInstance } from './instance'

export const getUserInfo = () => {
  return baseInstance.get(`/member/auth`)
}

export const updateUserInfo = (nickname: string) => {
  return baseInstance.put(`/member`, { params: { nickname } })
}
