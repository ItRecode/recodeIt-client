import { NICKNAME_MIN_LENGTH } from '@assets/constant/constant'
import { Dispatch, SetStateAction } from 'react'

export const getIsValidateNickname = (
  nickname: string,
  setErrorMessage: Dispatch<SetStateAction<string>>
) => {
  const spacePattern = /\s/g
  const consonantAndVowelPattern = /[ㄱ-ㅎㅏ-ㅣ]/
  const specialPattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\\{}[\]\\/₩]/gim
  const emojiPattern =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g

  if (nickname.length < NICKNAME_MIN_LENGTH) {
    setErrorMessage(`${NICKNAME_MIN_LENGTH}글자 이상 입력해주세요.`)
    return false
  }

  if (nickname.match(spacePattern)) {
    setErrorMessage('공백은 사용할 수 없어요.')
    return false
  }

  if (nickname.match(specialPattern)) {
    setErrorMessage('특수문자는 사용할 수 없어요.')
    return false
  }

  if (nickname.match(consonantAndVowelPattern)) {
    setErrorMessage('자음이나 모음만은 사용할 수 없어요.')
    return false
  }

  if (nickname.match(emojiPattern)) {
    setErrorMessage('이모지는 사용할 수 없어요.')
    return false
  }

  return true
}
