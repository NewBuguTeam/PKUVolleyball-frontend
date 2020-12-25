// pages/matchInfo/matchInfo.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderName : {"M": "联赛", "F": "女子"},
    teamA: "",
    teamAPoint: "",
    teamB: "",
    teamBPoint: "",
    date: "",
    time: "",
    group: "",
    place: "",
    id:0,
    detailedPoints:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var matchInfo = app.globalData.matchInfo
    this.setData({
      id: matchInfo.id,
      teamA: matchInfo.teamA,
      teamB: matchInfo.teamB,
      date: matchInfo.date,
      time: matchInfo.time,
      group: this.data.genderName[matchInfo.gender] + matchInfo.group,
      place: matchInfo.location,
      teamAPoint: matchInfo.score.split(':')[0],
      teamBPoint: matchInfo.score.split(':')[1]
    })
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'matchInfo/' + self.data.id + '/',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
          self.setData({
            detailedPoints: res.data.detailedPoints
          })
          
      },
      fail: function(res) {
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