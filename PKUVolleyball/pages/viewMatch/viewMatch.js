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
        time: this.getTime(oldList[key].time),
        gender: oldList[key].gender, 
        group: oldList[key].for_group_X_or_knockout_X,
        teamA: oldList[key].teamA,
        teamB: oldList[key].teamB,
        score: oldList[key].point,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util.formatTime(new Date()))
    this.setData({
      Date: util.formatDate(new Date())
    })
    console.log(this.data.Date)
    console.log(this.getDateString(this.GetNewDate(this.data.Date, -1)))
    console.log(this.getDateString(this.data.Date))

    let self = this;
    // 获得一天前的日期
    var queryDate = this.getDateString(this.GetNewDate(this.data.Date, +1))
    console.log(queryDate)
    
    // 先获得过去的比赛
    wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "beginsAt": queryDate
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
              pastMatchList: newList,
              pastDate: self.timeParse(res.data.matches[length-1].time)
            })
            console.log(self.data.pastDate)
          }
          
          console.log(self.data.matchList)
      },
      fail: function(res) {
          console.log('请求比赛失败！' + res.errMsg)
      }
    })

    // 获得四天之后往前的比赛
    queryDate = this.getDateString(this.GetNewDate(this.data.Date, + 7))

     // 再获得之后的比赛
     wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "beginsAt": queryDate
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
              futureMatchList: newList,
              futureDate: self.timeParse(res.data.matches[length-1].time)
            })
            console.log(self.data.pastDate)
          }
          
          console.log(self.data.matchList)
      },
      fail: function(res) {
          console.log('请求比赛失败！' + res.errMsg)
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
    let self = this;
    // 获得最早时间更一天前的日期
    var queryDate = this.getDateString(this.GetNewDate(this.data.pastDate, -1))
    console.log(queryDate)
    
    // 先获得过去的比赛
    wx.request({
      url: app.globalData.rootUrl + '/viewMatches',
      data: {
        "beginsAt": queryDate
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8',
        'Cookie': 'session=' + util.getStorage("session")
      },
      
      success:function(res){
          console.log('request returns: ', res.data)
          if(res.data.matches.length == 0){
            util.showMassage("没有更多了！")
            return
          }
          let oldList = res.data.matches
          let newList = self.Transform(oldList)
          var length = res.data.matches.length;
          if(length > 0){
            self.setData({
              pastMatchList: newList.concat(self.data.pastMatchList),
              pastDate: self.timeParse(res.data.matches[length-1].time)
            })
            console.log(self.data.pastDate)
          }
      },
      fail: function(res) {
          console.log('下拉失败！' + res.errMsg)
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})