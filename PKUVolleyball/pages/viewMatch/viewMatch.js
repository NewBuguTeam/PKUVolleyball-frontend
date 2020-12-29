// pages/view/viewMatch.js
const util = require("../../utils/util")
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderName:{"M":"联赛","F":"女子"},
    numOfDatesRequesting: 2,
    pastDate: "2020.12.4",
    futureDate: "2020.12.15",
    group: "",
    Mgroup: "",
    Fgroup: "",
    nullUrl: "",
    identity: "visitor",
    umpireIdentity: "umpire",
    Date:{},
    monthDay: [31,28,31,30,31,30,31,31,30,31,30,31],
    pastMatchList: [],
    futureMatchList: []
  },

  UpdateMonthDay: function(y){
    if(y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)){
      this.data.monthDay[1] = 29
    }
    else{
      this.data.monthDay[1] = 28
    }
  },

  GetNewDate: function(oldDate, d){
    var newDate = oldDate
    newDate.day += d
    this.UpdateMonthDay(newDate.year)
    while(newDate.day > this.data.monthDay[newDate.month - 1]){
      newDate.day -= this.data.monthDay[newDate.month - 1]
      newDate.month ++
      if(newDate.month == 13){
        newDate.month = 1
        newDate.year++
        this.UpdateMonthDay(newDate.year)
      }
    }
    while(newDate.day <= 0){
      newDate.month --
      if(newDate.month == 0){
        newDate.month = 12
        newDate.year--
        this.UpdateMonthDay(newDate.year)
      }
      newDate.day += monthDay[newDate.month - 1]
    }
    return newDate
  },

  ClickForMatchDetail: function(e){
    var that = this
    var index = e.currentTarget.id
    var query = JSON.stringify(that.data.pastMatchList[index])
    console.log(e.currentTarget.dataset.item)
    app.globalData.matchInfo = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../matchInfo/matchInfo',
    })
  },

  formatNumber: function(n){
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  timeParse: function(time){
    time = time.split(' ')[0]
    console.log(time)
    let list = time.split('-')
    console.log(list)
    let year = parseInt(list[0])
    let month = parseInt(list[1])
    let day = parseInt(list[2])
    return {year : year, month : month, day : day} 
  },

  getDateString: function(Date){
    var queryDate = [Date.year, Date.month, Date.day].map(this.formatNumber).join('-')
    return queryDate
  },

  getTime: function(time){
    console.log(time)
    time = time.split(' ')[1]
    let times = time.split(':')
    console.log(times)
    return times[0] + ":" + times[1]
  },

  JudgeDate: function(Date1, Date2){
    if(Date1.year != Date2.year) return false;
    if(Date1.month != Date2.month) return false;
    if(Date1.day != Date2.day) return false;
    return true
  },

  Transform: function(oldList){
    var curDate = {year:0, month:0, day:0}, curListItem = {}
    var newList = []
    let dateIndex =  -1, matchIndex = 0
    for(var key in oldList){
      if(!this.JudgeDate(this.timeParse(oldList[key].time), curDate)){
        curDate = this.timeParse(oldList[key].time)
        if(dateIndex != -1)
          newList[dateIndex] = curListItem
        dateIndex ++;
        matchIndex = 0;
        curListItem = {date : this.getDateString(curDate), list : []}
      }
      let item = {
        id: oldList[key].id,
        time: this.getTime(oldList[key].time),
        date: this.getDateString(curDate),
        gender: oldList[key].gender, 
        group: oldList[key].for_group_X_or_knockout_X,
        teamA: oldList[key].teamA,
        teamB: oldList[key].teamB,
        score: oldList[key].point,
        location: oldList[key].location,
        umpireImageUrl: oldList[key].umpireIcon,
        viceUmpireImageUrl: oldList[key].viceUmpireIcon
      }
      console.log(item)
      curListItem.list[matchIndex++] = item
      console.log(curListItem)
    }
    newList[dateIndex] = curListItem
    console.log("newList", newList)
    return newList
  },

  getMatchList: function(){
    
  },

  umpireRequest: function(e){
    console.log("Umpire Request")
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'umpire/umpireRequest',
      data: {
        "id": JSON.stringify(e.currentTarget.dataset.item.id),
        "identity": JSON.stringify(1),
        "type": JSON.stringify(0)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          self.RefreshFuture()
      },
      fail: function(res) {
          console.log('请求执裁失败！' + res.errMsg)
      }
    })
  },

  viceUmpireRequest: function(e){
    console.log("Vice Umpire Request", e.currentTarget.dataset.item.id)
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'umpire/umpireRequest',
      data: {
        "id": JSON.stringify(e.currentTarget.dataset.item.id),
        "identity": JSON.stringify(2),
        "type": JSON.stringify(0)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          self.RefreshFuture()
      },
      fail: function(res) {
          console.log('请求执裁失败！' + res.errMsg)
      }
    })
  },

  umpireQuit: function(e){
    console.log("Umpire Quit")
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'umpire/umpireRequest',
      data: {
        "id": JSON.stringify(e.currentTarget.dataset.item.id),
        "identity": JSON.stringify(1),
        "type": JSON.stringify(-1)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          self.RefreshFuture()
      },
      fail: function(res) {
          console.log('退出执裁失败！' + res.errMsg)
      }
    })
  },

  viceUmpireQuit: function(e){
    console.log("Vice Umpire Quit")
    var self = this
    wx.request({
      url: app.globalData.rootUrl + 'umpire/umpireRequest',
      data: {
        "id": JSON.stringify(e.currentTarget.dataset.item.id),
        "identity": JSON.stringify(2),
        "type": JSON.stringify(-1)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          self.RefreshFuture()
      },
      fail: function(res) {
          console.log('请求执裁失败！' + res.errMsg)
      }
    })
  },

  // 请求pastData往后的值，并更新pastMatchList
  BackRequest: function(day){
    let self = this;
    var queryDate = this.getDateString(this.GetNewDate(this.data.pastDate, 0))
    console.log("Query:", queryDate)
    // 先获得过去的比赛
    wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "beginsAt": JSON.stringify(queryDate),
        "matchDaysRequesting": JSON.stringify(day),
        "direction": JSON.stringify("U")
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          let oldList = res.data.matches
          let newList = self.Transform(oldList)
          var length = res.data.matches.length;
          if(length > 0){
            self.setData({
              pastMatchList: newList.concat(self.data.pastMatchList),
              pastDate: self.timeParse(res.data.matches[0].time)
            })
            // console.log(self.data.pastDate)
          }
          else{
            util.showMassage("没有更早的比赛了！")
          }
          
          // console.log(self.data.matchList)
      },
      fail: function(res) {
          console.log('请求比赛失败！' + res.errMsg)
      }
    })
  },

  ForwardRequest: function(day){
    let self = this;
    var queryDate = this.getDateString(this.GetNewDate(this.data.futureDate, 0))
    console.log(queryDate)
    wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "beginsAt": JSON.stringify(queryDate),
        "matchDaysRequesting": JSON.stringify(day),
        "direction": JSON.stringify("D")
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          let oldList = res.data.matches
          let newList = self.Transform(oldList)
          var length = res.data.matches.length;
          if(length > 0){
            self.setData({
              futureMatchList: self.data.futureMatchList.concat(newList),
              futureDate: self.timeParse(res.data.matches[length-1].time)
            })
            //console.log(self.data.futrueDate)
          }
          else{
            util.showMassage("没有更新的比赛了！");
          }
      },
      fail: function(res) {
          console.log('上拉失败！' + res.errMsg)
      }
    })
  },

  RefreshFuture: function(){
    var curDate = util.formatDate(new Date())
    var deltaDate = this.data.futureMatchList.length
    this.setData({
      futureDate: this.GetNewDate(curDate, -1),
      futureMatchList: []
    })
    console.log("deltaDate:", deltaDate)
    this.ForwardRequest(deltaDate)
    console.log("futrueMatchList:", this.data.futureMatchList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util.formatTime(new Date()))
    var curDate = util.formatDate(new Date())
    this.setData({
      pastDate: curDate,
      futureDate: this.GetNewDate(curDate, -1)
    })
    this.BackRequest(1)
    this.ForwardRequest(1)
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
    this.RefreshFuture()
    this.setData({
      identity: app.globalData.identity
    })
    let self = this
    if(this.data.identity == "umpire"){
      wx.request({
        url: app.globalData.rootUrl + 'school2group/' + app.globalData.school,
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8',
          'Cookie': 'session=' + util.getStorage("session")
        },
        
        success : function(res){
          console.log("res:",res,res.data)
          self.setData({
            Mgroup: res.data.Mgroup,
            Fgroup: res.data.Fgroup
          })
        },
  
        fail : function(res){
  
        }
      })
    }
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

  upperHander: function(){
    this.BackRequest(2)
  },

  bottomHander: function(){
    this.ForwardRequest(2)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     this.upperHander()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.bottomHander()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})