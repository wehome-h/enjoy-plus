import { createHttp } from 'wechat-http'

let http = createHttp({
  showLoading: false
})

// 1. 设置全局默认请求地址
http.baseURL = 'https://live-api.itheima.net'

// 2. 设置请求拦截器
http.intercept.request = (config) => {
  // 2.1 对请求配置做点什么
  console.log('请求拦截器', config)
  const app = getApp()
  if (app.token) {
    config.header = {
      ...config.header,
      Authorization: `Bearer ${app.token}`
    }
  }
  return config
}

// 3. 设置响应拦截器
http.intercept.response = async (res) => {
  // 3.1 对响应数据做点什么
  console.log('响应拦截器', res.data)
  if (res.data.code === 401) {
    /* const pageStack = getCurrentPages()
    const { route } = pageStack.pop()
    wx.redirectTo({ url: '/pages/login/index?redirectURL=/' + route })
    return Promise.reject(res.data) */

    if (res.config.url.includes('/refreshToken')) {
      const app = getApp()
      app.token = ''
      app.refreshToken = ''
      app.setToken('token', '')
      app.setToken('refreshToken', '')

      const pageStack = getCurrentPages()
      const { route } = pageStack.pop()
      wx.redirectTo({ url: '/pages/login/index?redirectURL=/' + route })

      return Promise.reject(res.data)
    }

    const app = getApp()
    app.token = ''
    app.setToken('token', '')

    const refreshToken = app.refreshToken
    if (refreshToken) {
      const res2 = await http.post(
        '/refreshToken',
        {},
        {
          header: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      )
      app.token = res2.data.token
      app.refreshToken = res2.data.refreshToken
      app.setToken('token', res2.data.token)
      app.setToken('refreshToken', res2.data.refreshToken)

      res.config.header = {
        Authorization: `Bearer ${app.token}`
      }

      return await http(res.config)
    } else {
      const pageStack = getCurrentPages()
      const { route } = pageStack.pop()
      wx.redirectTo({ url: '/pages/login/index?redirectURL=/' + route })
      return Promise.reject(res.data)
    }
  } else if (res.data.code !== 10000) {
    wx.utils.toast(res.data.message || '请求数据失败')
    return Promise.reject(res.data)
  }
  // 3.2 返回响应数据
  return res.data
}

// 4. 导出
export default http
