//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    rootUrl: 'http://127.0.0.1:5000/',
    userInfo: null,
    identity: "visitor",
    session: "",
    myInfoUrl: "pages/my/my",
    group: "",
    gender: "",
    publicKey: "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDQ6JeGf2mKaMyyPjY/AcJU07lHDQaKLe4+Pr5lCNUR8XhRxVQQQW9BX23lgbxqWYSGlosANZEETqPWcnZx4a76ARGhZ/agirsbGaElFPiK9ejHxj5RPhDWia3Y2nmv8h2f7UdGfZtIOs+St/fNwPfhehWPCjqlP9TI3VZMRosBwIDAQAB-----END PUBLIC KEY-----",
    privateKey: ""
  }
})