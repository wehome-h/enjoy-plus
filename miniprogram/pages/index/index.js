Page({
  data: {
    list: []
  },

  onLoad() {
    this.getData()
  },

  async getData() {
    const res = await wx.http({
      method: 'GET',
      url: '/announcement'
    })
    this.setData({
      list: res.data
    })
  }
})
