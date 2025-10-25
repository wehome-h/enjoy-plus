// components/auth/auth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  lifetimes: {
    attached() {
      const app = getApp()

      const isLogin = Boolean(app.token)

      this.setData({
        isLogin
      })

      // 未登录，跳转到登录页面
      if (!isLogin) {
        const pageStack = getCurrentPages()
        const { route } = pageStack.pop()
        // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
        wx.redirectTo({
          url: '/pages/login/index?redirectURL=/' + route
        })
      }
    }
  }
})
