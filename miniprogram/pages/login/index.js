import validate from 'wechat-validate'

Page({
  // 通过 behaviors 注入 validate 方法
  behaviors: [validate],

  data: {
    timeData: {},
    countDownVisible: false,
    mobile: '13123456789',
    code: '123456',
    redirectURL: ''
  },

  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' }
    ],
    code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
    ]
  },

  /** 倒计时 */
  countDownChange(ev) {
    console.log('倒计时变化', ev.detail)
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0
    })
  },

  /** 发送验证码 */
  async getSMSCode() {
    // 校验手机号码
    const { valid, message, datakey } = this.validate('mobile')
    console.log('校验结果', valid, message, datakey)
    if (!valid) return wx.utils.toast(message)

    wx.showLoading({ title: '发送中...', mask: true })

    const res = await wx.http({
      method: 'GET',
      url: '/code',
      data: {
        mobile: this.data.mobile
      }
    })

    wx.utils.toast('验证码发送成功')

    // 显示倒计时组件
    this.setData({
      countDownVisible: true,
      code: res.data.code
    })
  },

  /** 提交登录 */
  async onSubmit() {
    // 校验所有字段
    const valid = this.validate()
    console.log('校验结果', valid)
    if (!valid) return wx.utils.toast('请检查填写信息是否正确')

    wx.showLoading({ title: '登录中...', mask: true })

    const res = await wx.http({
      method: 'POST',
      url: '/login',
      data: {
        mobile: this.data.mobile,
        code: this.data.code
      }
    })

    wx.utils.toast('登录成功')

    // 保存 token 信息到全局
    const app = getApp()
    app.token = res.data.token
    app.refreshToken = res.data.refreshToken

    // 保存 token 信息到本地缓存
    // wx.setStorageSync('token', res.data.token)
    // wx.setStorageSync('refreshToken', res.data.refreshToken)

    app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)

    // 登录成功后，跳转回原页面
    const redirectURL = this.data.redirectURL
    if (!redirectURL)
      return wx.switchTab({
        url: '/pages/my/index'
      })
    else if (
      redirectURL === '/pages/my/index' ||
      redirectURL === '/pages/my/index'
    )
      return wx.switchTab({
        url: redirectURL
      })
    else
      wx.redirectTo({
        url: redirectURL
      })
    console.log('跳转到', redirectURL)
  },

  onLoad(options) {
    console.log('登录页面参数', options)
    if (options.redirectURL) {
      this.setData({
        redirectURL: options.redirectURL
      })
    }
  }
})
