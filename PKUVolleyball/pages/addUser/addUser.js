// pages/addUser/addUser.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin : true,
    username : "",
    password : ""
  },

  inputUsername : function(e){
    this.setData({
      username : e.detail.value
    })
  },

  inputPassword : function(e){
    this.setData({
      password : e.detail.value
    })
  },

  changeRadio: function(e){
    this.setData({
      isAdmin: e.detail.value
    })
    console.log(this.data.isAdmin);
  },

  addUser: function(e){
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'admin/addUser',
      data: {
          username: JSON.stringify(self.data.username),
          password: JSON.stringify(self.data.password),
          isAdmin: JSON.stringify(self.data.isAdmin)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      
      success: function(res){
          console.log('request getActList returns: ', res.data)
          console.log('request getActList returns: ', res.data.alist)
          if(res.data.isAdmin == false)
            self.setData({
              identity: "Umpire"
            })
          else
            self.setData({
              identity: "admin"
            })
          self.setData({
              imageSrc: res.data.image,
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