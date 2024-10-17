const defaultColors = {
  white: '#fff',
  black: '#000',

  textGrey: '#b9b9b9',
  error: '#DB107C', //'#DB107C',
  'error-variant': '#720753', // '#720753',
  info: '#2196F3',
  success: '#61D58C', // '#61D58C',
  'success-variant': '#33545e', // '#33545e',
  warning: '#FB8C00', // '#FB8C00',
}

const light = {
  dark: false,
  colors: {
    'background-app': 'linear-gradient(45deg, #DA157C, #62C3D7)',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    foreground: '#000000',
    label: '#6e6e6e',

    primary: '#DB107C', // '#DB107C',
    'primary-darken-1': '#3700B3',
    secondary: '#02a6d0', // '#02a6d0',
    'secondary-darken-1': '#018786', // '#018786',
    tertiary: '8A5FA4', // '#8A5FA4',
    'tertiary-variant': '48266e', // '#48266e',
    accent: '#162c59', // '#162c59',

    ...defaultColors,
  },
}

const dark = {
  dark: true,
  colors: {
    ...defaultColors,
  },
}

export default { light, dark }
