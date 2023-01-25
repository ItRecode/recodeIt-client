import {
  Cake,
  Celebrate,
  Consolate,
  Depress,
  Happy,
  Love,
  MySide,
  Sympathy,
} from '@assets/chip_icon'

export const getChipIconName = (categoryName: string) => {
  switch (categoryName) {
    case '축하해주세요':
      return Celebrate
    case '행복해요':
      return Happy
    case '기념일이에요':
      return Cake
    case '연애중이에요':
      return Love
    case '위로해주세요':
      return Consolate
    case '우울해요':
      return Depress
    case '공감이 필요해요':
      return Sympathy
    case '내 편이 되어주세요':
      return MySide
    default:
      return ''
  }
}
