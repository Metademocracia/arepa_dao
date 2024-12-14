export const APP_NAMES = {
  camelcase: 'metaDemocracia',
  kedabcase: 'meta-democracia',
  snakecase: 'meta_democracia',
  capitalize: 'AREPA DIGITAL',
  values: () => Object.values(APP_NAMES),
}

export const ALERT_TYPE = {
  success: "success",
  error: "error",
  values: () => Object.values(ALERT_TYPE),
}

export const SCROLL_TO = {
  top: Symbol,
  bottom: Symbol,
  values: () => Object.values(SCROLL_TO),
}
