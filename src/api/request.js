import axios from 'axios'

// 根据配置启用mock
const modulesContext = require.context('../views', true, /mock\.js/)
modulesContext.keys().forEach(cur => {
  const mockFunc = modulesContext(cur).default
  mockFunc.enable && typeof mockFunc === 'function' && mockFunc()
})

const service =
  axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
    headers: {
      get: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      post: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    },
    withCredentials: true,
    timeout: 30000,
    transformRequest: [
      data => {
        data = JSON.stringify(data)
        return data
      }
    ],
    transformResponse: [
      data => {
        if (typeof data === 'string' && data.startsWith('{')) {
          data = JSON.parse(data)
        }
        return data
      }
    ]
  })

  // 请求拦截器
  service.interceptors.request.use(
    config => {
      return config
    },

    error => {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '服务器异常，请稍后再试！'
      return Promise.resolve(error)
    }
  )

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      const status = response.status
      let res = response.data
      let msg = ''

      if (status < 200 || status >= 300 || !res.success) {
        msg = showStatus(status)
        if (typeof res === 'string') {
          res = { msg }
        } else {
          res.msg = msg
        }
      }

      return res
    },

    error => {
      let res = {
        success: false,
        msg: error && error.toString() || '请求失败，请稍后再试'
      }
      return Promise.resolve(res)
    }
  )

  function showStatus(status) {
    let message = ''

    switch (status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
        break
      case 403:
        message = '拒绝访问(403)'
        break
      case 404:
        message = '请求出错(404)'
        break
      case 408:
        message = '请求超时(408)'
        break
      case 500:
        message = '服务器错误(500)'
        break
      case 501:
        message = '服务未实现(501)'
        break
      case 502:
        message = '网络错误(502)'
        break
      case 503:
        message = '服务不可用(503)'
        break
      case 504:
        message = '网络超时(504)'
        break
      case 505:
        message = 'HTTP版本不受支持(505)'
        break
      default:
        message = `请求失败(${status})`
    }

    return `${message}，请稍后再试！`
  }

export default service
