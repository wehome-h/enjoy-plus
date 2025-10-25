Page({
  data: {
    dialogVisible: false,
    list: [],
    id: null
  },

  async getList() {
    const res = await wx.http.get('/room')
    this.setData({ list: res.data })
  },

  async swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
        id: ev.mark.id
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  dialogClose() {
    this.setData({
      id: null
    })
  },

  async onDelete() {
    wx.showLoading({ title: '删除中...', mask: true })

    await wx.http.delete('/room/' + this.data.id)
    this.getList()

    wx.utils.toast('删除成功')
  },

  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index'
    })
  },

  onLoad() {
    this.getList()
  }
})
