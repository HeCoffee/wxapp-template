import { promisifyAll } from 'miniprogram-api-promise'

const storageKey = 'test-wxapp-template'
const version = '1.0.0'
const loginUrl = '/login'

// wx Promise
const wxp = {}
promisifyAll(wx, wxp)

App({
  async onLaunch (options) {
    console.log(`version: ${version}-${process.env.NODE_ENV}`)
    this.options = options
    this.clearOldSession()
    try {
      const tokenInfo = await this.checkToken()
      this.globalData.header.Authorization = this.globalData.authorizationPrefix + tokenInfo.token
      this.globalData.tokenInfo = tokenInfo
    } catch (err) {
      console.log('app 捕捉err登陆全部', err)
      this.hideLoading()
      this.alert('请删除小程序稍后重新打开', '服务器打瞌睡')
    }
  },
  onShow () {
    this.checkMPVersion()
  },
  // 判断小程序版本是否需要更新
  checkMPVersion () {
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          console.log('有新版本可以更新')
        }
      })
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  },
  // 新版本上线，清除旧版本的session
  clearOldSession () {
    const nowVersion = wx.getStorageSync(`${storageKey}-version`);
    if (version !== nowVersion) {
      wx.clearStorageSync();
      wx.setStorageSync(`${storageKey}-version`, version);
    }
  },
  // 检查token 是否过期 是否需要重新登录
  async checkToken () {
    const token = wx.getStorageSync(storageKey)
    // 提前一小时过期
    if (token && token.expires_in - 3600 * 1000 > Date.now()) return token
    // 登录
    const wxRes = await wxp.login()
    const data = {
      code: wxRes.code,
      app_id: this.globalData.appid
    }
    const loginRes = await this.post(loginUrl, data)
    if (loginRes.code !== 0) throw new Error(loginRes.msg)
    const tokenInfo = loginRes.data
    tokenInfo.expires_in = tokenInfo.expires_in * 1000 + Date.now()
    wx.setStorageSync(storageKey, tokenInfo)
    return tokenInfo
  },
  // 用iv和encryptedData解密用户信息前
  // 需要检查一次 session 是否有效 无效则更新
  async updateToken () {
    // try {
    // 	const res = await wxp.checkSession()
    //   console.log('session invalid>>>', res)
    // } catch (e) {
    // 	console.log('session invalid>>>', e)
    // }
    // 强制刷新
    // 登录
    const wxRes = await wxp.login()
    const data = {
      code: wxRes.code,
      app_id: this.globalData.appid
    }
    const loginRes = await this.post(loginUrl, data)
    if (loginRes.code !== 0) throw new Error(loginRes.msg)
    const tokenInfo = loginRes.data
    tokenInfo.expires_in = tokenInfo.expires_in * 1000 + Date.now()
    wx.setStorageSync(storageKey, tokenInfo)
    this.globalData.header.Authorization = this.globalData.authorizationPrefix + tokenInfo.token
    this.globalData.tokenInfo = tokenInfo
    return true
  },
  // 弹窗
  alert (content = '', title = '', cb) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      mask: true,
      success: cb
    })
  },

  loading (title = '') {
    wx.showLoading({
      mask: true,
      title
    })
  },

  hideLoading () {
    wx.hideLoading()
  },

  // 统一分享配置
  returnShareInfo (setShareInfo = {}) {
    const defaultShareInfo = {
      title: '微信模板',
      imageUrl: '',
      path: '/pages/home/index'
    }
    return Object.assign(defaultShareInfo, setShareInfo)
  },

  getHttpHeader (url, exHeader) {
    return new Promise((resolve, reject) => {
      // loginUrl 不需要 header
      if ([loginUrl].includes(url)) return resolve({})
      if (this.globalData.tokenInfo.token) return resolve(Object.assign(exHeader, this.globalData.header))
      let getHeaderTimes = 0
      const getHeaderInterval = setInterval(() => {
        getHeaderTimes += 1
        if (this.globalData.tokenInfo.token) {
          clearInterval(getHeaderInterval)
          return resolve(Object.assign(exHeader, this.globalData.header))
        }
        if (getHeaderTimes >= 100) {
          clearInterval(getHeaderInterval)
          reject(new Error('token timeout'))
        }
      }, 100)
    })
  },

  async http (url, data = {}, exHeader = {}, method) {
    const header = await this.getHttpHeader(url, exHeader)
    const res = await wxp.request({
      url: this.globalData.httpUrl + url,
      method,
      data,
      header
    })
    return res.data
  },

  async post (url, data = {}, exHeader = {}) {
    const res = await this.http(url, data, exHeader, 'POST')
    return res
  },

  async get (url, data = {}, exHeader = {}) {
    const res = await this.http(url, data, exHeader, 'GET')
    return res
  },

  async put (url, data = {}, exHeader = {}) {
    const res = await this.http(url, data, exHeader, 'PUT')
    return res
  },

  async delete (url, data = {}, exHeader = {}) {
    const res = await this.http(url, data, exHeader, 'DELETE')
    return res
  },

  globalData: {
    wxp,
    appid: 'wxd47cc15e945e6372',
    httpUrl: process.env.BASE_API,
    tokenInfo: {},
    authorizationPrefix: 'Bearer ',
    header: {
      Authorization: ''
    }
  }
})
