Page({
  data: {
    detail: {}
  },

  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl:
        'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png'
    }
  },

  async getDetail(id) {
    if (!id) return
    const res = await wx.http.get('/visitor/' + id)
    this.setData({
      detail: res.data
    })
  },

  showOpenSettingModal() {
    wx.showModal({
      title: '需要相册权限',
      content: '请允许小程序访问您的相册，以便保存图片。',
      confirmText: '去设置',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          // 只有在用户点击“去设置”后才调用 openSetting
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.writePhotosAlbum']) {
                this.saveImage()
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '未授权相册，无法保存'
                })
              }
            },
            fail: () => {
              wx.showToast({
                icon: 'none',
                title: '无法打开设置，请手动开启'
              })
            }
          })
        }
      }
    })
  },

  /** 小程序授权检测 */
  authSetting() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          // 已授权，直接保存
          this.saveImage()
        } else {
          // 未授权，尝试请求
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.saveImage()
            },
            fail: () => {
              // 请求失败，可能是用户拒绝或“不再询问”
              this.showOpenSettingModal()
            }
          })
        }
      }
    })
  },

  /** 保存图片 */
  async saveImage() {
    try {
      // 1. 获取图片信息(下载图片到本地)
      const { path } = await wx.getImageInfo({
        src: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/uploads/qrcode.png'
      })

      // 2. 调用 API 保存到相册, 不支持网络图片
      await wx.saveImageToPhotosAlbum({
        filePath: path
      })

      wx.utils.toast('保存成功')
    } catch (error) {
      wx.utils.toast('保存失败')
    }
  },

  onLoad(options) {
    this.getDetail(options.id)
  }
})
