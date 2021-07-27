/**
 * @desc 节流函数
 */
const throttle = (fn, delay = 300) => {
  let timer = null

  return function () {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/**
 * @desc 防抖函数
 */
const debounce = () => {
  let timer = null

  return function () {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}


/**
 * @desc 平滑滚动
 * @param {*} position 
 * @param {*} callback 
 */
const scrollSmoothTo = (position, callback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return setTimeout(callback, 17)
    }
  }

  // 当前滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 滚动step方法
  let step = function () {
    // 距离目标滚动距离
    let distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
      typeof callback === 'function' && callback()
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }

  step()
}

/**
 * @desc 获取 url 参数
 */
const getParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&])(&|$)', 'i')
  const url = window.location.search.substr(1)
  const values = url.match(reg)

  if (values) return decodeURIComponent(values[2])
  return undefined
}

/**
 * @description: getCookie
 * @param name
 * @returns {string}
 */
const getCookie = (name) => {
  let arrStr = document.cookie.split('; ')
  for (let i = 0; i < arrStr.length; i++) {
    let temp = arrStr[i].split('=')
    if (temp[0] === objName) return decodeURIComponent((temp[1] || '').trim())
  }
  return ''
}

/**
 * @description: setCookie
 */
const setCookie  = (name, value, day = 30, path = '/') => {
  let str = `name=${value}; `
  if (day) str += `expires=${new Date(Date.now() + day * 24 * 3600 * 1000).toGMTString()}; `
  if (path) str += `path=${path}; `

  let host = window.location.hostname.split('.')
  host[0] = ''
  str += 'domain=' + host.join('.')
  document.cookie = str
}

/**
 * @desc: js 懒加载
 */
const lazyLoadSource = (url = '') => {
  // 用于存放懒加载资源的相关信息
  if (!window.LazyLoad_Source) window.LazyLoad_Source = {}

  // 获取资源 name 作为 key
  let regMatched = url.match(/(^|\/)([^\/]+)\.js/, 'i')
  let srcName = regMatched[2]
  let source = window.LazyLoad_Source
  source[srcName] || (source[srcName] = {})
  let src = source[srcName]

  return new Promise((resolve) => {
    // 若加载过此 js，不再处理
    if (src.isLoaded) {
      resolve()
      return
    }

    // 如果正在加载此资源，推入队列等待加载完成后处理
    if (src.isLoading) {
      if (!src.quene) {
        src.quene = [() => resolve()]
      } else if (Array.isArray(src.quene)) {
        src.quene.push(() => resolve())
      }
      return
    }

    // 标记正在加载此资源
    src.isLoading = true

    // 引入资源
    let script = document.createElement('script')
    script.setAttribute('src', url)
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
      if (Array.isArray(src.quene)) src.quene.forEach(fn => fn())
      delete src.isLoading
      src.isLoaded = true
    }
  })
}

export {
  throttle,
  debounce,
  scrollSmoothTo,
  getParam,
  getCookie,
  setCookie,
  lazyLoadSource
}