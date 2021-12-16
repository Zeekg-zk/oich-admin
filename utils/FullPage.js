const utils = {
  getWheelDelta (event) {
    if (event.wheelDelta) {
      this.getWheelDelta = event => event.wheelDelta
      return event.wheelDelta
    } else {
      this.getWheelDelta = event => -event.detail
      return -event.detail
    }
  },
  throttle (method, content, delay) {
    let flag = false
    return function (...args) {
      if (flag) {
        return
      }
      method.apply(content, args)
      flag = true
      setTimeout(() => {
        flag = false
      }, delay)
    }
  },
  debounce (method, content, delay) {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        method.apply(content)
      }, delay)
    }
  }
}

class FullPage {
  constructor (options) {
    // 默认配置
    const defalutOptions = {
      el: 'fullpage',
      delay: 700,
      defineAnimation: () => { }
    }
    // 合并配置信息
    this.options = Object.assign(defalutOptions, options)
    // 获取当前视图容器
    this.container = document.querySelector(`#${this.options.el}`)
    // 获取当前视图高度
    this.viewHeight = document.documentElement.clientHeight
    // 当前显示的第几个
    this.currentIndex = 0
    // 当前的位置
    this.currentPosition = 0
    // 自定义的显示动画函数
    this.options.defineAnimation = this.options.defineAnimation.bind(this)
    // 滚动的页面元素 以及 页面个数
    this.pages = document.querySelectorAll('.page')
    this.pageNum = this.pages.length

    this.init()
  }

  toPosition (position) {
    this.container.style.top = `${position}px`
  }

  // 向上滚动一次
  goUp () {
    if (-this.container.offsetTop >= this.viewHeight) {
      this.currentPosition = this.currentPosition + this.viewHeight
      this.toPosition(this.currentPosition)
      // 改变当前显示的下标
      this.currentIndex = Math.abs(this.currentPosition / this.viewHeight)
      this.options.defineAnimation()
    }
  }

  // 向下滚动一次
  goDown () {
    if (-this.container.offsetTop <= (this.viewHeight * (this.pageNum - 2))) {
      this.currentPosition = this.currentPosition - this.viewHeight
      this.toPosition(this.currentPosition)
      // 改变当前显示的下标
      this.currentIndex = Math.abs(this.currentPosition / this.viewHeight)
      this.options.defineAnimation()
    }
  }

  // 鼠标滚动
  scrollMouse (event) {
    const delta = utils.getWheelDelta(event)
    if (delta > 0) {
      this.goUp()
    } else {
      this.goDown()
    }
  }

  // 浏览器大小改变
  windowResize () {
    this.viewHeight = document.documentElement.clientHeight
    this.container.style.height = `${this.viewHeight}px`

    this.currentPosition = -(this.currentIndex * this.viewHeight)
    this.toPosition(this.currentPosition)
  }

  init () {
    this.container.style.height = `${this.viewHeight}px`

    if (navigator.userAgent.toLowerCase().includes('firefox') === true) {
      document.addEventListener('DOMMouseScroll', utils.throttle(this.scrollMouse, this, this.options.delay))
    } else {
      document.addEventListener('mousewheel', utils.throttle(this.scrollMouse, this, this.options.delay))
    }

    window.addEventListener('resize', (utils.debounce(this.windowResize, this, 100)).bind(this))
  }

  destroy () {
    if (navigator.userAgent.toLowerCase().includes('firefox') === true) {
      document.removeEventListener('DOMMouseScroll', utils.throttle(this.scrollMouse, this, this.options.delay))
    } else {
      document.removeEventListener('mousewheel', utils.throttle(this.scrollMouse, this, this.options.delay))
    }

    window.removeEventListener('resize', (utils.debounce(this.windowResize, this, 100)).bind(this))
  }
}

export default FullPage
