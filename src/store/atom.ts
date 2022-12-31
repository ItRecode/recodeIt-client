import { atom } from 'recoil'

export const formDataAtom = atom({
  key: 'formData',
  default: {
    selectedCategory: 0,
    selectedColor: 'icon-purple',
    selectedIcon: 'heart',
  },
})
