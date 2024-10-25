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
    'background-app': 'linear-gradient(45deg, #F6F5F5, #F6F5F5)',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    foreground: '#000000',
    label: '#6e6e6e',

    primary: '#ED6D05', // '#DB107C',
    'primary-darken-1': '#ED6D05',
    secondary: '#DEE6EA', // '#02a6d0',
    'secondary-darken-1': '#DEE6EA', // '#018786',
    tertiary: 'ED6D05', // '#8A5FA4',
    'tertiary-variant': 'ED6D05', // '#48266e',
    accent: '#b07200', // '#162c59',

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
