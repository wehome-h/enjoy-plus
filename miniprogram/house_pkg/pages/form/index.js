// \u4e00-\u9fa5] 中文验证规则

import validate from 'wechat-validate'

Page({
  behaviors: [validate],

  data: {
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
    point: '',
    building: '',
    room: '',
    name: '',
    gender: null,
    mobile: '',
    id: null
  },

  rules: {
    name: [
      { required: true, message: '请填写姓名' },
      { pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '姓名格式不正确' }
    ],
    gender: [{ required: true, message: '请选择性别' }],
    mobile: [
      { required: true, message: '请填写手机号码' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }
    ],
    idcardFrontUrl: [{ required: true, message: '请上传身份证人像面照片' }],
    idcardBackUrl: [{ required: true, message: '请上传身份证国徽面照片' }]
  },

  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },

  async choosePicture(ev) {
    const type = ev.mark?.type
    const { tempFiles } = await wx.chooseMedia({
      count: 1,
      mediaType: ['image']
    })

    if (tempFiles[0]?.size > 5 * 1024 * 1024)
      return wx.utils.toast('图片大小不能超过 5MB')

    wx.showLoading({ title: '上传中...', mask: true })

    const res = await wx.http.upload('/upload', {
      name: 'file', // 文件的 key
      filePath: tempFiles[0]?.tempFilePath, // 文件的 value
      formData: {} // // HTTP 请求中其他额外的 form data
    })

    wx.hideLoading()

    this.setData({ [type]: res.data.url })
  },

  async onSubmit() {
    const isValid = this.validate()
    if (!isValid) return wx.utils.toast('请完善表单信息')

    const params = {
      point: this.data.point,
      building: this.data.building,
      room: this.data.room,
      name: this.data.name,
      gender: this.data.gender,
      mobile: this.data.mobile,
      idcardFrontUrl: this.data.idcardFrontUrl,
      idcardBackUrl: this.data.idcardBackUrl
    }

    wx.showLoading({ title: '提交中...', mask: true })

    await wx.http({
      method: 'POST',
      url: '/room',
      data: this.data.id ? { ...params, id: this.data.id } : params
    })

    wx.utils.toast('提交成功')

    wx.redirectTo({
      url: '/house_pkg/pages/list/index'
    })
  },

  async getDetail(id) {
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      id: res.data.id,
      point: res.data.point,
      building: res.data.building,
      room: res.data.room,
      name: res.data.name,
      gender: res.data.gender,
      mobile: res.data.mobile,
      idcardFrontUrl: res.data.idcardFrontUrl,
      idcardBackUrl: res.data.idcardBackUrl
    })
  },

  onLoad(options) {
    if (options.room) {
      this.setData({
        point: options.point,
        building: options.building,
        room: options.room
      })
    } else if (options.id) {
      this.getDetail(options.id)
    } else {
      wx.redirectTo({
        url: '/house_pkg/pages/locate/index'
      })
    }
  }
})
