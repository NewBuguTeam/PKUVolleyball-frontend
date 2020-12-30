// pages/viewGroup/viewGroup.js
var app = getApp()
const util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameOfGender:{"M": "联赛组", "F": "女子组"},
    identity: "visitor",
    adminIdentity: "admin",
    //colors: ["#FF375F","#95C8FA","#FFD60A","#30D158"],
    //colors: ["#FF7F50",  "#FFA07A", "#FFDEAD", "#F0E68C"],
    //colors: ["#A0522D",  "#CD5C5C", "#BC8F8F", "#F08080"],
    //colors: ["#8A2BE2",  "#6A5ACD", "#9370DB", "#7B68EE"],
    colors: ["#4169e1",  "#1e90ff", "#6495ed", "#00bfff"],
    groupLists: []
  },

  uploadGroup: function(e){
    var self = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res){
        const tempFilePaths = res.tempFiles
        console.log("", res)
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: app.globalData.rootUrl + 'admin/uploadGroup',
          success(res){
            self.data.setData({
              groupLists : res.groupLists
            })
          }
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'viewGrouping',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
        console.log(res.data)
        self.setData({
          groupLists : res.data.groupLists
        })
      },
      fail: function(res){
        console.log(res.errMsg)
      }
    })
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