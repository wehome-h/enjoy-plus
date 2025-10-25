// pages/profile/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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

  /** 更新昵称 */
  async updateNickname(e) {
    if (!e.detail.value.trim()) return

    await wx.http({
      method: 'PUT',
      url: '/userInfo',
      data: {
        nickName: e.detail.value
      }
    })
  },

  /** 更新头像 */
  async updateAvatar(e) {
    console.log(e)
    const res = await wx.http.upload('/upload', {
      name: 'file', // 文件的 key
      filePath: e.detail.avatarUrl, // 文件的 value
      // HTTP 请求中其他额外的 form data
      formData: {
        type: 'avatar'
      }
    })

    this.setData({
      'userInfo.avatar': res.data.url
    })

    /* wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('token')
      },
      name: 'file',
      filePath: e.detail.avatarUrl,
      formData: {
        type: 'avatar'
      },
      success: (res) => {
        const result = JSON.parse(res.data)
        this.setData({
          'userInfo.avatar': result.data.url
        })
      }
    }) */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
