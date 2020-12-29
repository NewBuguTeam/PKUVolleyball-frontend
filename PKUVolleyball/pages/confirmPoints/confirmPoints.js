// pages/confirmPoints/confirmPoints.js
var app = getApp()
var storageTime = 30 * 60
const util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxRound: 5,
    nameA: "信科",
    nameB: "医学",
    curRound: 0,
    curPointA: 0,
    curPointB: 0,
    allPoints: [],
    curProcedure: "",
    showTimeTicker: false,
    minute:"00",
    second:"00",
    microSecond:"00",
    timer:null,
    startTime:""
  },

  ruleAction:function(){
    var that = this;
    that.setData({
      ruleDesImageHidden: false,
    })
  },

  formatString: function(value){
    if(Number(value) < 10)
      return "0" + value
    else
      return value
  },

  calcuDeltaTime: function(dateTime1, dateTime2){
    let time1 = dateTime1.split(' ')[1].split(':')
    let time2 = dateTime2.split(' ')[1].split(':')
    console.log(time1)
    console.log(time2)
    let ans = []
    ans[2] = Number(time1[2]) - Number(time2[2])
    if(ans[2] < 0){
      ans[2] += 60
      time1[1] = Number(time1[1]) - 1
    }
    ans[1] = Number(time1[1]) - Number(time2[1])
    if(ans[1] < 0){
      ans[1] += 60
      time1[0] = Number(time1[0]) - 1
    }
    ans[0] = Number(time1[0]) - Number(time2[0])
    if(ans[0] < 0){
      console.log("不允许跨日期的比赛")
      ans[0] += 24
    }
    let ansString = this.formatString(ans[0]) + ":" + this.formatString(ans[1])
    + ":" + this.formatString(ans[2])
    return ansString
  },

  recordPoints: function(){
    let curTime = util.formatTime(new Date())
    let deltaTime = this.calcuDeltaTime(curTime, this.data.startTime)
    let point='allPoints['+this.data.curRound+'].point'
    let procedure='allPoints['+this.data.curRound+'].procedure'
    let duration='allPoints['+this.data.curRound+'].duration'
    let startTime='allPoints['+this.data.curRound+'].startTime'
    this.setData({
      [point]: this.data.curPointA + ":" + this.data.curPointB,
      [procedure]: this.data.curProcedure,
      [duration]: deltaTime,
      [startTime]: this.data.startTime
    })
    util.putStorage("allPoints", this.data.allPoints, storageTime)
    console.log(this.data.allPoints)
  },

  loadPoint:function(){
    this.setData({
      allPoints: util.getStorage("allPoints")
    })
    let curRound = this.data.curRound
    if(this.data.allPoints[curRound] == undefined){
      let curTime = util.formatTime(new Date())
      this.setData({
        curPointA: 0,
        curPointB: 0,
        curProcedure: "",
        startTime:curTime
      })
      return
    }
    let point = this.data.allPoints[curRound].point.split(':')
    this.setData({
      curPointA: Number(point[0]),
      curPointB: Number(point[1]),
      curProcedure: this.data.allPoints[curRound].procedure,
      startTime: this.data.allPoints[curRound].startTime
    })
  },

  teamAScore:function(e){
    this.setData({
      curPointA: this.data.curPointA + 1,
      curProcedure: this.data.curProcedure + 'A'
    })
    console.log(this.data.curProcedure)
  },

  teamBScore:function(e){
    this.setData({
      curPointB: this.data.curPointB + 1,
      curProcedure: this.data.curProcedure + 'B'
    })
    console.log(this.data.curProcedure)
  },

  chooseCurRound:function(e){
    console.log(e.currentTarget.dataset.index)
    this.recordPoints()
    this.setData({
      curRound: e.currentTarget.dataset.index
    })
    this.loadPoint()
  },

  setInterval: function () {
    const self = this
    var second = self.data.second
    var minute = self.data.minute
    var microSecond = self.data.microSecond   
    self.data.timer = setInterval(function () {  // 设置定时器
        microSecond--
        if (microSecond < 0) {
            microSecond = 99
            second--
            if (second < 0) {
                second = 59  //  大于等于60分归零
                minute--
                if (minute < 0) {
                  clearInterval(self.data.timer);
                  util.showMassage("计时结束！")
                  self.setData({
                    showTimeTicker: false
                  })
                  return
                }
                if (minute < 10) {
                    self.setData({
                        minute: '0' + minute
                    })
                } else {
                    self.setData({
                        minute: minute
                    })
                }
            }
            if (second < 10) {
                self.setData({
                    second: '0' + second
                })
            } else {
                self.setData({
                    second: second
                })
            }
        }
        if (microSecond < 10) {
            self.setData({
                microSecond: '0' + microSecond
            })
        } else {
            self.setData({
                microSecond: microSecond
            })
        }
    }, 10)
  },

  exitTimeTick: function(){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认退出？',
      success (res){
        clearInterval(self.data.timer);
        util.showMassage("计时结束！")
        self.setData({
          showTimeTicker: false
        })
      },
      fail:function(res){
        
      }
    })   
  },

  startTimeTicker: function(second){
    let minute = 0
    if(second >= 60){
      minute = second / 60;
      second = second % 60;
    }
    if(minute < 10){
      minute = "0" + minute
    }
    if(second < 10){
      second = "0" + second
    }
    this.setData({
      minute: minute,
      second: second,
      microSecond: "00",
      showTimeTicker: true
    })
    this.setInterval()
  },

  pauseButton: function(e){
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if(item == 'A'){
      this.setData({
        pauseTimeA : this.data.pauseTimeA + 1,
        curProcedure: this.data.curProcedure + 'C'
      })
    }
    else{
      this.setData({
        pauseTimeA : this.data.pauseTimeB + 1,
        curProcedure: this.data.curProcedure + 'D'
      })
    }
    this.startTimeTicker(30)
  },

  submitScore: function(e){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认提交？',
      success (res){
        self.recordPoints()
        util.showMassage("提交成功！")
        self.startTimeTicker(180)
        let curTime = util.formatTime(new Date())
        self.setData({
          curRound: self.data.curRound + 1,
          curPointA: 0,
          curPointB: 0,
          curProcedure: "",
          startTime:curTime
        })
        console.log(self.data.startTime)
      },
      fail:function(res){

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curTime = util.formatTime(new Date())
    this.setData({
      startTime: curTime
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