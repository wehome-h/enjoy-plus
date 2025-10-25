// app.js

import utils from './utils/utils'
import http from './utils/http'
// 将工具库挂载到全局 wx 对象上
wx.utils = utils
wx.http = http

App({
  token: wx.getStorageSync('token') || '',
  refreshToken: wx.getStorageSync('refreshToken') || '',
  globalData: {},

  /** 设置 token */
  setToken(key, token) {
    this[key] = token
    wx.setStorageSync(key, token)
  }
})
