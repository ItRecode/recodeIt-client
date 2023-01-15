export interface IAuth {
  type: string
  token: string
}

export interface ISignUp {
  type: string
  tempId: string
  nickname: string
}

export interface User {
  nickname: string
}
