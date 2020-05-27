const app = getApp()

Page({
  data: {
    title: '首页',
    day: Date.now()
  },
  onLoad () {
    this.getShowInfo()
  },
  async getShowInfo () {
    try {
      app.loading()
      const res = await app.get('/show/index', { page_on: 1, page_size: 100, promoted: 1 })
      console.log(res)
      app.hideLoading()
    } catch (err) {
      console.log('err>>>>', err)
      app.hideLoading()
    }
  },
  // 转发
  onShareAppMessage (e) {
    return app.returnShareInfo()
  }
})
