// app.js

import utils from './utils/utils'
// 将工具库挂载到全局 wx 对象上
wx.utils = utils

App({
  globalData: {}
})
