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
  },

  /**
   * 格式化日期
   * @param {*} timestamp 时间戳
   * @returns 格式化后的日期字符串，格式：YYYY-MM-DD
   */
  formatDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`
  }
}

// 导出
export default utils
