// pages/my/my.js
const app = getApp()
var storageTime = 30 * 60
var util = require('../../utils/util.js')
var RSA = require('../../utils/wx_rsa.js')
var Key = require('../../utils/Key.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      theme: 'default' // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题色在参考 /theme 文件夹
    },
    identityName: {"visitor": "游客", "umpire": "裁判", "admin": "管理员"},
    identity: "visitor",
    visitorIdentity: "visitor",
    umpireIdentity: "umpire",
    nickName: "Visitor",
    imageSrc: "../../images/guest.png",
    username: "",
    password: "",
    encryptedPassword: "",
    gameList: [],
    school: "",
    gender: ""
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

  encryptPassword: function(){
    var input_rsa = this.data.password
    var encrypt_rsa = new RSA.RSAKey()
    encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey)
    var encStr = encrypt_rsa.encrypt(input_rsa)
    encStr = RSA.hex2b64(encStr)
    this.data.encryptedPassword = encStr
  },

  decryptPassword: function(){
    var decrypt_rsa = new RSA.RSAKey()
    decrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.privateKey)
    var encStr = RSA.b64tohex(this.data.encryptedPassword);
    var decStr = decrypt_rsa.decrypt(encStr)
    this.data.password = decStr
  },

  SignIn: function(e){
    var self = this;
    this.encryptPassword()
    console.log("加密后", this.data.encryptedassword)
    this.decryptPassword()
    console.log("解密后", this.data.password)
    console.log(app.globalData.identity);
    wx.request({
      url: app.globalData.rootUrl + '/login',
      data: {
          username: JSON.stringify(self.data.username),
          password: JSON.stringify(self.data.password),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
          console.log('username:', self.data.username)
          console.log("password：", self.data.password)
          console.log('request returns: ', res.data)
          if(res.data.success == false){
            if(res.data.errorType == "username"){
              util.showMassage("用户名错误!")
            }
            else if(res.data.errorType == "password"){
              util.showMassage("密码错误!")
            }
            return
          }
          try{
            var sessionID = res.cookies[0].substr(res.cookies[0].indexOf("=") + 1,
            res.cookies[0].indexOf(";") - res.cookies[0].indexOf("=") - 1)
            app.globalData.session = sessionID
            util.putStorage("session", sessionID, storageTime)
          }
          catch(e){
            console.log(e)
          }
          

          if(res.data.isAdmin == false){
            self.setData({
              identity: "umpire"
            })
            app.globalData.identity = "umpire"
          }
            
          else{
            self.setData({
              identity: "admin"
            })
            app.globalData.identity = "admin"
          }
            
          self.setData({
              imageSrc: "../../images/icon1.jpg",
              school: res.data.school
            })
          app.globalData.school = res.data.school
          app.globalData.iconUrl = "../../images/icon1.jpg";
      },
      fail: function(res) {
          console.log('登陆失败！' + res.errMsg)
      }
    })
  },

  SignOut: function (e){
    var self = this
    wx.request({
      url: app.globalData.rootUrl + '/logout',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
        self.setData({
          identity: "visitor",
          nickName: "Visitor",
          imageSrc: "../../images/guest.png",
          gameList: [],
          department: ""
        })
        util.removeStorage("session")
        app.globalData.identity = "visitor";
        app.globalData.iconUrl = "../../images/guest.png";
        console.log(app.globalData.identity);
      },
      fail: function(res){
        console.log(res.errMsg)
      }
    })
  },

  addUser: function(e){
    wx.navigateTo({
      url: '../addUser/addUser',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.privateKey = Key.privateKey
    // console.log(privateKey)
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
    this.setData({
      identity: app.globalData.identity
    })
    console.log(this.data.identity)
    console.log(app.globalData.identity)
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