import { baseInstance } from './instance'

export const getRecord = async (recordId: string | undefined) => {
  if (recordId) {
    return await baseInstance.get(`/record/${recordId}`)
  }
}
