// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "Visitor",
    imageSrc: "../../images/guest.png",
    username: "",
    password: "",
    gameList: [],
    department: ""
  },

  InputUsername: function(e){
    this.setData({
      username: e.detail.value
  })
  },

  InputPassword: function(e){
    this.setData({
      username: e.detail.value
  })
  },

  SignIn: function(e){
    wx.request({
      url: app.globalData.rootUrl + 'user/UserInfo',
      data: {
          username: JSON.stringify(username),
          password: JSON.stringify(password),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      
      success: function(res){
          console.log('request getActList returns: ', res.data)
          console.log('request getActList returns: ', res.data.alist)
     
          self.setData({
              identity: list,
              nickName: res.data.nickName,
              imageSrc: res.data.image,
              gameList: res.data.gamelist,
              department: res.data.department
            })
          
      },
      fail: function(res) {
          console.log('登陆失败！' + res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})