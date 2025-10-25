import { createHttp } from 'wechat-http'

const http = createHttp({
  showLoading: false
})

// 1. 设置全局默认请求地址
http.baseURL = 'https://live-api.itheima.net'

// 2. 设置响应拦截器
http.intercept.response = (res) => {
  // 2.1 对响应数据做点什么
  console.log('响应拦截器', res.data)
  if (res.data.code !== 10000) {
    wx.utils.toast(res.data.message || '请求数据失败')
    return Promise.reject(res.data)
  }
  // 2.2 返回响应数据
  return res.data
}

// 3. 导出
export default http
