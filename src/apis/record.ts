// import { WriteRecordRequestDto } from '@pages/AddRecord/AddRecord'
import { baseInstance } from './instance'

export const getCategory = () => {
  return baseInstance.get('/record/category', {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'http://localhost:3000/record/add',
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrollRecord = async (data: FormData) => {
  // try {
  //   const response = await axios({
  //     method: 'post',
  //     url: `${REACT_APP_DEV_API_END_POINT}/record`,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     data,
  //   })
  //   return response
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (error: any) {
  //   throw new Error(error)
  // }
  return baseInstance.post('/record', {
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
