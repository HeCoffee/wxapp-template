const app = getApp()
const { wxp } = app.globalData

Page({
  data: {
    title: '我的'
  },
  async onLoad () {
    try {
      const res = await wxp.getUserInfo()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  // 转发
  onShareAppMessage (e) {
    return app.returnShareInfo()
  }
})
