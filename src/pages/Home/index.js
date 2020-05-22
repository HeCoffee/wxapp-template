const app = getApp()

Page({
  data: {
    title: '首页'
  },
  onLoad () {
    this.getShowInfo()
  },
  async getShowInfo () {
    try {
      app.loading()
      const res = await app.get('/show/index?page_on=1&page_size=100&promoted=1')
      const	swiperList = []
      if (res.data.rows.length === 0) throw new Error('暂无精选演出')
      res.data.rows.forEach(item => {
        const swiperItem = {
          id: item._id,
          swiperBg: item.show_cover[0],
          coverBg: item.show_over_background,
          name: item.show_name,
          desc: item.description,
          isSale: item.selling_status,
          payType: item.service_provider_type
        }
        swiperList.push(swiperItem)
      })
      this.setData({
        swiperList
      })
      app.hideLoading()
    } catch (e) {
      console.log('err>>>>', e)
      app.hideLoading()
      app.alert('暂无精选演出', '敬请期待')
    }
  },
  // 转发
  onShareAppMessage (res) {
    return app.returnShareInfo()
  }
})
