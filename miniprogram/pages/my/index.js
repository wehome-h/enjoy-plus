Page({
  data: {
    userInfo: {}
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },

  /** 获取用户信息 */
  async getUserInfo() {
    const res = await wx.http({
      method: 'GET',
      url: '/userInfo'
    })

    this.setData({
      userInfo: res.data
    })
  },

  onLoad() {
    this.getUserInfo()
  }
})
