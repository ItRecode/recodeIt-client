// import { WriteRecordRequestDto } from '@pages/AddRecord/AddRecord'
import axios from 'axios'
import { baseInstance } from './instance'

export const getCategory = () => {
  return baseInstance.get('/record/category')
}

const { REACT_APP_DEV_API_END_POINT } = process.env

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrollRecord = async (data: any) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${REACT_APP_DEV_API_END_POINT}/record`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
    })
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
  // return baseInstance.post('/record',headers: { 'Content-Type': 'multipart/form-data' }, {
  //     files: null,
  //     writeRecordRequestDto,

  // })
}
