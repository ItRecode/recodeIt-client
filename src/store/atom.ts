import { atom } from 'recoil'

export const formDataAtom = atom({
  key: 'formData',
  default: {
    selectedCategory: 3,
    selectedColor: 'icon-purple',
    selectedIcon: 'heart',
  },
})
