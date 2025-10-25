Page({
  data: {
    detail: {}
  },

  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + this.data.detail.id
    })
  },

  async getDetail(id) {
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      detail: res.data
    })
  },

  onLoad(options) {
    console.log('options:', options)
    this.getDetail(options.id)
  }
})
