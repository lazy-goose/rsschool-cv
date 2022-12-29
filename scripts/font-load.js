(() => {
  let body = document.body
  let fontContent = document.querySelector('.font-content')

  const CLASSES = {
    FONT_LOADING: 'font-loading',
    FONT_ERROR: 'font-error',
    FONT_LOADED: 'font-loaded',
    TRANSPARENT: 'transparent',
  }

  WebFont.load({
    google: {
      families: ['Amatic+SC:400', 'Spline+Sans+Mono:300']
    },
    loading: () => {
      body.classList.add(CLASSES.FONT_LOADING)
    },
    active: () => {
      body.classList.remove(CLASSES.FONT_LOADING)
      fontContent.classList.remove(CLASSES.TRANSPARENT)
      body.classList.add(CLASSES.FONT_LOADED)
    },
    inactive: () => {
      body.classList.remove(CLASSES.FONT_LOADING)
      fontContent.classList.remove(CLASSES.TRANSPARENT)
      body.classList.add(CLASSES.FONT_ERROR)
    },
    timeout: 3500,
  })
})()

