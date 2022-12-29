(() => {
  class ImageChanger {
    constructor(imageElement, initSources = []) {
      let prepend = imageElement.src ? [imageElement.src] : []
      let sources = initSources.map(this._toAbsolutePath)
      this.sources = prepend.concat(sources)
      this.image = imageElement
      this.index = 0
      this.sessionKeyName = null /* connectSessionStorage() */
    }

    connectSessionStorage(sessionKeyName) {
      let sessionValue = Number(sessionStorage.getItem(sessionKeyName)) || 0
      this.sessionKeyName = sessionKeyName
      this.index = sessionValue
      this.image.src = this.sources[sessionValue]
      return this
    }

    _toAbsolutePath(anyPath) {
      return new URL(anyPath, document.location).href
    }
    _calculateNextIndex() {
      return (this.index + 1) % this.sources.length
    }
    _calculatePrevIndex() {
      return (this.index - 1 + this.sources.length) % this.sources.length
    }

    get src() {
      let current = () => this.sources[this.index]
      let prev = () => this.sources[this._calculatePrevIndex()]
      let next = () => this.sources[this._calculateNextIndex()]
      return {
        get current() { return current() },
        get prev() { return prev() },
        get next() { return next() },
      }
    }

    incrementIndex() {
      this.index = this._calculateNextIndex()
      if (this.sessionKeyName !== null) {
        sessionStorage.setItem(this.sessionKeyName, this.index)
      }
      return this.index
    }

    applyIndex() {
      return (this.image.src = this.sources[this.index])
    }

    next() {
      this.incrementIndex()
      this.applyIndex()
      return this.src.current
    }
  }

  const CLASSES = {
    LOADING: 'loading',
    ERROR: 'error',
    LOADED: 'loaded',
  }
  const LOADING_DELAY = 350

  let avatar = document.querySelector('#avatar')
  let avatarImage = document.querySelector('#avatar img')

  let imageChanger = new ImageChanger(avatarImage, [
    "assets/duck1.png", "assets/duck2.png",
    "assets/duck3.png", "assets/duck4.png",
  ])
  imageChanger.connectSessionStorage('AVATAR_IMAGE')

  let onClick = () => {
    let isImageLoaded = avatarImage.complete
    if (isImageLoaded) {
      avatar.classList.add(CLASSES.LOADING)
      setTimeout(() => imageChanger.next(), LOADING_DELAY)
    }
  }
  let onError = () => {
    avatar.classList.remove(CLASSES.LOADING)
    avatar.classList.add(CLASSES.ERROR)
  }
  let onLoad = (e) => {
    avatar.classList.remove(CLASSES.LOADING)
    avatar.classList.add(CLASSES.LOADED)
  }

  avatarImage.addEventListener('click', onClick)
  avatarImage.addEventListener('error', onError)
  avatarImage.addEventListener('load', onLoad)
})()

