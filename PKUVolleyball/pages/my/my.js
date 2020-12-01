// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: "visitor",
    visitorIdentity: "visitor",
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
      password: e.detail.value
  })
  },

  SignIn: function(e){
    this.setData({
      identity: "umpire",
      nickName: "袁世平",
      imageSrc: "../../images/wechatImage.jpg",
      gameList: [],
      department: "信息科学技术学院"
    })
    app.globalData.identity = "umpire";
    console.log(app.globalData.identity);
    /*wx.request({
      url: app.globalData.rootUrl + '/login',
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
    })*/
  },

  SignOut: function (e){
    this.setData({
      identity: "visitor",
      nickName: "Visitor",
      imageSrc: "../../images/guest.png",
      gameList: [],
      department: ""
    })
    app.globalData.identity = "visitor";
    console.log(app.globalData.identity);
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