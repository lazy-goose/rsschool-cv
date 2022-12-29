(() => {
  let cursor = document.querySelector('#cursor')
  let content = document.querySelector('#content')

  ;(function preloadCursors() {
    new Image().src = 'assets/cursor.default.64x64.png'
    new Image().src = 'assets/cursor.pointer.64x64.png'
  })()

  const CLASSES = {
    INIT: 'init',
    POINTER: 'pointer',
  }

  let move = ({ x, y }) => {
    cursor.style.setProperty('--x', x + 'px')
    cursor.style.setProperty('--y', y + 'px')
  }

  content.addEventListener('mousemove', (e) => {
    let x = e.clientX + 32
    let y = e.clientY + 64
    move({ x, y })
    cursor.classList.add(CLASSES.INIT)
  })

  window.addEventListener('resize', () => {
    cursor.classList.remove(CLASSES.INIT)
  })

  content.querySelectorAll(['a', '#avatar'].join(',')).forEach(el => {
    el.addEventListener('mouseover', () => {
      cursor.classList.add(CLASSES.POINTER)
    })
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove(CLASSES.POINTER)
    })
  })

  console.info(
    `%cTo enable cursor chaser type in console: 'cursorChaser = true'`,
    `color: Orange`
  )
  Object.defineProperty(window, 'cursorChaser', {
    set(value) {
      if (value) {
        cursor.classList.remove('disable')
      } else {
        cursor.classList.add('disable')
      }
    }
  })

})()

