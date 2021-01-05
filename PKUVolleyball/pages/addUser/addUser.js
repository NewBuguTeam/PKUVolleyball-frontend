const util = require("../../utils/util")
var RSA = require('../../utils/wx_rsa.js')
// pages/addUser/addUser.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin : true,
    username : "",
    password : "",
    encryptedPassword : "",
    school : "",
    schoolList : ['数学', '物理', '化学', '生科', '城环', '地空', '心理', '信科', '工学', '软微', '环科', '国关', '法学', '信管', '社会', '政管', '教育', '新传', '中文', '历史', '考古', '哲学', '外院', '艺术', '医学', '经济', '光华', '国发', '元培']
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

  bindPickerChange: function(e){
    this.setData({
      school : this.data.schoolList[e.detail.value]
    })
  },

  changeRadio: function(e){
    this.setData({
      isAdmin: e.detail.value
    })
    console.log(this.data.isAdmin);
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

  submitAddUser: function(e){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认添加用户？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //self.encryptPassword()
          //console.log(self.data.encryptedPassword)
          //self.decryptPassword()
          //console.log(self.data.password)
          wx.request({
            url: app.globalData.rootUrl + 'admin/addUser',
            data: {
                newUsername: JSON.stringify(self.data.username),
                newPassword: JSON.stringify(self.data.password),
                newIsAdmin: JSON.stringify(self.data.isAdmin),
                newSchool: JSON.stringify(self.data.school)
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'chartset': 'utf-8',
              'Cookie': 'session=' + util.getStorage("session")
            },
            
            success: function(res){
                console.log('request returns: ', res.data)
                if(res.data == "New user successfully created")
                  util.showMassage("创建成功！")
                else
                  util.showMassage("创建失败！");
                  
            },
            fail: function(res) {
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  addUser: function(e){
    var self = this
    //this.encryptPassword()
    //console.log(this.data.encryptedPassword)
    //this.decryptPassword()
    //console.log(this.data.password)
    wx.request({
      url: app.globalData.rootUrl + 'admin/addUser',
      data: {
          newUsername: JSON.stringify(self.data.username),
          newPassword: JSON.stringify(self.data.password),
          newIsAdmin: JSON.stringify(self.data.isAdmin),
          newSchool: JSON.stringify(self.data.school)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
          console.log('request returns: ', res.data)
          util.showMassage("创建成功!")
      },
      fail: function(res) {
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