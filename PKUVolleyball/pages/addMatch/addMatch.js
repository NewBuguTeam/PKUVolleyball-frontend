// pages/addMatch/addMatch.js
var app = getApp()
const util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupLists: [],
    pickerList: [["联赛组", "女子组"],["A", "B", "C", "D"]],
    genderIndex:{
      "联赛组" : 0,
      "女子组" : 1
    },
    genderName:{
      "联赛组" : "M",
      "女子组" : "F"
    },
    groupIndex:{
      "A" : 0,
      "B" : 1,
      "C" : 2,
      "D" : 3
    },
    gender: "",
    group: "请选择分",
    teamA: "队伍1",
    teamB: "队伍2",
    date: "请选择日期",
    time: "请选择时间",
    location: "五四"
  },

  bindMultiPickerChange: function(e){
    this.setData({
      gender : this.data.pickerList[0][e.detail.value[0]],
      group: this.data.pickerList[1][e.detail.value[1]]
    })
    var List = this.data.groupLists[this.data.genderIndex[this.data.gender]]
    List = List.groupList[this.data.groupIndex[this.data.group]].teamList
    this.setData({
      teamA: List[0],
      teamB: List[1]
    })
  },

  bindTeamAPickerChange: function(e){
    var List = this.data.groupLists[this.data.genderIndex[this.data.gender]]
    List = List.groupList[this.data.groupIndex[this.data.group]].teamList
    this.setData({
      teamA : List[e.detail.value]
    })
  },

  bindTeamBPickerChange: function(e){
    var List = this.data.groupLists[this.data.genderIndex[this.data.gender]]
    List = List.groupList[this.data.groupIndex[this.data.group]].teamList
    this.setData({
      teamB : List[e.detail.value]
    })
  },

  bindTimePickerChange: function(e){
    this.setData({
      time: e.detail.value
    })
  },

  bindDatePickerChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  bindInputLocation: function(e){
    this.setData({
      location: e.detail.value
    })
  },

  submitAddMatch: function(e){
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'admin/addMatch',
      data: {
          gender: JSON.stringify(self.data.genderName[self.data.gender]),
          for_group_X_or_knockout_X: JSON.stringify(self.data.group),
          time: JSON.stringify(self.data.date + " " + self.data.time + ":00"),
          teamA: JSON.stringify(self.data.teamA),
          teamB: JSON.stringify(self.data.teamB),
          location: JSON.stringify(self.data.location)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success: function(res){
          console.log('request returns: ', res.data)
          if(res.data == "not login yet"){
            util.showMassage("还未登录!")  
          }
          else{
            util.showMassage("创建成功!")
          }
          
      },
      fail: function(res) {
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