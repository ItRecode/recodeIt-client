import { baseInstance } from './instance'

export const getUserInfo = () => {
  return baseInstance.get(`/member/auth`)
}
