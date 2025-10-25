Page({
  data: {
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    house: {},
    repairItem: [],
    repair: {},
    mobile: '',
    appointment: '',
    description: '',
    attachment: []
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  selectHouse(ev) {
    console.log('select house', ev.detail)
    this.setData({ house: ev.detail })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  selectRepair(ev) {
    console.log('select repair', ev.detail)
    this.setData({ repair: ev.detail })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index'
    })
  },

  async getHouseList() {
    const res = await wx.http.get('/house')
    this.setData({ houseList: res.data })
  },

  async getRepairItem() {
    const res = await wx.http.get('/repairItem')
    this.setData({ repairItem: res.data })
  },

  confirmDate(ev) {
    console.log('confirm date', ev.detail)

    this.setData({
      currentDate: ev.detail,
      appointment: wx.utils.formatDate(ev.detail),
      dateLayerVisible: false
    })
  },

  deleteAttachment(ev) {
    console.log('delete attachment', ev.detail)
    const { index } = ev.detail
    const { attachment } = this.data
    attachment.splice(index, 1)
    this.setData({ attachment })
  },

  beforeRead(ev) {
    console.log('before read', ev.detail)
    const { file, callback } = ev.detail
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      wx.utils.toast('图片大小不能超过 5MB！')
      callback(false)
      return
    }
    callback(true)
  },

  async afterRead(ev) {
    console.log('after read', ev.detail)
    const { tempFilePath } = ev.detail.file

    wx.showLoading({ title: '上传中...', mask: true })

    const res = await wx.http.upload('/upload', {
      name: 'file',
      filePath: tempFilePath
    })

    wx.hideLoading()

    this.setData({
      attachment: [...this.data.attachment, res.data]
    })
  },

  onLoad() {
    this.getHouseList()
    this.getRepairItem()
  }
})
