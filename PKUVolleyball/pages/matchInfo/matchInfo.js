// pages/matchInfo/matchInfo.js
var app = getApp()
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
    scoreList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var matchInfo = app.globalData.matchInfo
    this.setData({
      teamA: matchInfo.teamA,
      teamB: matchInfo.teamB,
      date: matchInfo.date,
      time: matchInfo.time,
      group: this.data.genderName[matchInfo.gender] + matchInfo.group,
      place: matchInfo.location,
      teamAPoint: matchInfo.score.split(':')[0],
      teamBPoint: matchInfo.score.split(':')[1]

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