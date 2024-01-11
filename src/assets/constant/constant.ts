export const INPUT_DETAILS = Object.freeze({
  MAX_INPUT_TYPING: 12,
  MAX_TEXTAREA_TYPING: 200,
  MIN_TYPING: 0,
})

export const RECORD_TITLE_MAX_LENGTH = 12

export const TEXT_DETAILS = Object.freeze({
  CELEBRATION: 'celebration',
  CONSOLATION: 'consolation',
})

export const CELEBRATION_ID = 1
export const CONSOLATION_ID = 2

export const INITIAL_RECORD_DATA = {
  recordId: 0,
  categoryId: 0,
  categoryName: '',
  title: '',
  content: '',
  writer: '',
  colorName: '',
  iconName: '',
  createdAt: '',
  imageUrls: [],
}

export const UNAUTHORIZED_CODE = 401

export const RECORD_DETAIL_INITIAL_INPUT_HEIGHT = 89
export const RECORD_DETAIL_INPUT_IMAGE_HEIGHT = 74
export const RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA = 64
export const RECORD_DETAIL_INPUT_TEXTAREAT_INITIAL_HEIGHT = 25

export const INPUT_MODE = Object.freeze({
  REPLY: 'reply',
  NESTEDREPLY: 'nestedReply',
})

export const NICKNAME_MIN_LENGTH = 2
export const NICKNAME_MAX_LENGTH = 8
