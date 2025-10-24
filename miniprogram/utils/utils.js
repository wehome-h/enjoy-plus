const utils = {
  /**
   * 轻提示
   * @param {*} title 提示内容
   */
  toast(title = '提示') {
    wx.showToast({
      title,
      icon: 'none',
      mask: true
    })
  }
}

// 导出
export default utils
