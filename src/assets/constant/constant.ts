export const INPUT_DETAILS = Object.freeze({
  MAX_INPUT_TYPING: 12,
  MAX_TEXTAREA_TYPING: 200,
  MIN_TYPING: 0,
})

export const TEXT_DETAILS = Object.freeze({
  CELEBRATION: 'celebration',
  CONSOLATION: 'consolation',
})

export const INITIAL_RECORD_DATA = {
  record_id: 0,
  category_id: 0,
  category_name: '',
  title: '',
  content: '',
  writer: '',
  color_name: '',
  icon_name: '',
  created_at: '',
  image_urls: [],
}

export const UNAUTHORIZED_CODE = 401

export const RECORD_DETAIL_INITIAL_INPUT_HEIGHT = 84
export const RECORD_DETAIL_INPUT_IMAGE_HEIGHT = 74
export const RECORD_DETAIL_INPUT_HEIGHT_WITHOUT_TEXTAREA = 64
export const RECORD_DETAIL_HEADER_SECTION_HEIGHT = 61
