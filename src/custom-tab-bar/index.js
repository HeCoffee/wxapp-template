// 切换 tab 选中状态 需要在 page onshow 中调用 this.getTabBar().setData({selected: 1})
// 详细可看 https://developers.weixin.qq.com/community/develop/article/doc/000a82c79a8070fbe639313365c013

Component({
  data: {
    selected: 0,
    color: '#ffffff',
    selectedColor: '#e0b008',
    list: [
      {
        pagePath: '/pages/Home/index',
        iconPath: '/images/footer/home.png',
        selectedIconPath: '/images/footer/home1.png',
        text: '首页'
      },
      {
        pagePath: '/pages/Mine/index',
        iconPath: '/images/footer/mine.png',
        selectedIconPath: '/images/footer/mine1.png',
        text: '我的'
      }
    ]
  },
  attached () {},
  methods: {
    switchTab (e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
    }
  }
});
