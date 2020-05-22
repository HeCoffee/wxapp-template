const app = getApp()

Page({
  data: {
    title: '我的'
  },
  onLoad () {
  },
  // 转发
  onShareAppMessage (res) {
    return app.returnShareInfo()
  }
})
