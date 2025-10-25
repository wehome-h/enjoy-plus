import qqmapsdk from '../../../utils/qqmapsdk'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    address: ''
  },

  search(latitude, longitude) {
    qqmapsdk.search({
      location: {
        latitude,
        longitude
      },
      keyword: '住宅小区',
      page_size: 5,
      success: (res) => {
        this.setData({
          list: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const res = await wx.getLocation({ type: 'gcj02' })
    console.log('当前位置信息：', res)
    this.getPoint(res.latitude, res.longitude)
    this.search(res.latitude, res.longitude)
  },

  /** 逆地址解析 */
  getPoint(latitude, longitude) {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        console.log('逆地址解析结果：', res)
        this.setData({
          address: res.result.address
        })
      }
    })
  },

  /** 重新定位 */
  async reLocation() {
    const res = await wx.chooseLocation()
    console.log('重新选择位置：', res)
    this.setData({
      address: res.address
    })
    this.search(res.latitude, res.longitude)
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
