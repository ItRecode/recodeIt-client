module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'primary-1': '#6026DA',
        'primary-2': '#703CDE',
        'primary-3': '#8052E1',
        'primary-4': '#9067E5',
        'primary-5': '#9F7DE9',
        'primary-6': '#AF93EC',
        'primary-7': '#BFA8F0',
        'primary-8': '#CFBEF4',
        'primary-9': '#DFD4F8',
        'primary-10': '#EFE9FB',

        'sub-1': '#F33D63',
        'sub-2': '#F45073',
        'sub-3': '#F56482',
        'sub-4': '#F77792',
        'sub-5': '#F88BA1',
        'sub-6': '#F99EB1',
        'sub-7': '#FAB1C1',
        'sub-8': '#FCC5D0',
        'sub-9': '#FDD8E0',
        'sub-10': '#FEECEF',

        'grey-1': '#FFFFFF',
        'grey-2': '#F1F1F1',
        'grey-3': '#E0E0E0',
        'grey-4': '#CECECE',
        'grey-5': '#B8B8B8',
        'grey-6': '#A0A0A0',
        'grey-7': '#7D7D7D',
        'grey-8': '#656565',
        'grey-9': '#3E3E3E',
        'grey-10': '#121212',

        'icon-purple': '#9067E5',
        'icon-yellow': '#F3D06C',
        'icon-pink': '#D78A86',
        'icon-blue': '#6F99F2',
        'icon-green': '#78BCB7',

        danger: '#DA2626',
        inactive: '#D0D0D0',

        report: '#F83636',

        kakao: '#FEE500',
      },
      fontFamily: {
        sans: ['San Francisco'],
      },
      spacing: {
        85: '335px',
      },
      screens: {
        web: { min: '450px' },
        basic: { min: '375px', max: '450px' },
        small: { max: '375px' },
      },
      keyframes: {
        popUp: {
          '0%': { transform: 'translateY(200px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
}
