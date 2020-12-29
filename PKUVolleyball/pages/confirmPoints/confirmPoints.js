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
    startTime:"",
    pauseTimeA: 0,
    pauseTimeB: 0,
    exchangeTimeA: 0,
    exchangeTimeB: 0,
    curWinner: "unKnown",
    unKnownWinner: "unKnown",
    finalWinner: "unKnown",
    winners:[],
    winPoints:[25, 25, 25, 25, 15]
  },

  parseProcedure: function(){
    let procedure = this.data.curProcedure
    let pa = 0, pb = 0, ea = 0, eb = 0
    for(var i = 0, n = procedure.length; i < n; i++){
      if(procedure[i] == 'C') pa++
      else if(procedure[i] == 'D') pb++
      else if(procedure[i] == 'E') ea++
      else if(procedure[i] == 'F') eb++
    }
    console.log(procedure,pa,pb,ea,eb)
    this.setData({
      pauseTimeA: pa,
      pauseTimeB: pb,
      exchangeTimeA: ea,
      exchangeTimeB: eb
    })
  },

  judgeFinalWinner: function(){
    let cntA = 0, cntB = 0
    for(var i = 0; i < 5; i++){
      if(this.data.winners[i] == 'A')
        cntA++
      else if(this.data.winners[i] == 'B')
        cntB++
      else{
        if(this.data.allPoints[i] != undefined){
          let pointA = this.data.allPoints[i].point.split(':')[0]
          let pointB = this.data.allPoints[i].point.split(':')[1]
          if(pointA - pointB >= 2 && pointA >= this.data.winPoints[i])
            cntA++
          else if(pointB - pointA >= 2 && pointB >= this.data.winPoints[i])
            cntB++
        }
        
      }
      if(cntA >= 3){
        this.setData({
          finalWinner: "A"
        })
        return
      }
      else if(cntB >= 3){
        this.setData({
          finalWinner: "B"
        })
        return
      }
    }
  },

  judgeWinner: function(){
    let pointA = this.data.curPointA
    let pointB = this.data.curPointB
    let winPoint = this.data.winPoints[this.data.curRound]
    if(pointA >= winPoint && pointA - pointB >= 2){
      this.setData({
        curWinner : "A"
      })
    }
    else if(pointB >= winPoint && pointB - pointA >= 2){
      this.setData({
        curWinner : "B"
      })
    }
    else{
      this.setData({
        curWinner : "unKnown"
      })
    }
    if(this.data.curWinner != this.data.unKnownWinner){
      let massage = "第" + (this.data.curRound + 1) + "局结束，"
      if(this.data.curWinner == "A")
        massage += this.data.nameA + "胜利"
      else if(this.data.curWinner == "B")
        massage += this.data.nameB + "胜利"
      util.showMassage(massage)
      let winner = 'winners['+this.data.curRound+']'
      this.setData({
        [winner] : this.data.curWinner
      })
      console.log(this.data.winners)
      this.judgeFinalWinner()
    }
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
    util.removeStorage("allPoints")
    util.putStorage("allPoints", this.data.allPoints, storageTime)
    util.removeStorage("curRound")
    util.putStorage("curRound", this.data.curRound, storageTime)
    console.log(this.data.allPoints)
  },

  loadPoint:function(){
    this.setData({
      curRound: util.getStorage("curRound"),
      allPoints: util.getStorage("allPoints")
    })
    if(this.data.curRound == undefined){
      this.setData({
        curRound: 0
      })
    }
    if(this.data.allPoints == undefined){
      this.setData({
        allPoints: []
      })
    }
    let curRound = this.data.curRound
    if(this.data.allPoints[curRound] == undefined){
      let curTime = util.formatTime(new Date())
      this.setData({
        curPointA: 0,
        curPointB: 0,
        curProcedure: "",
        startTime:curTime,
      })
      this.parseProcedure()
      this.judgeWinner()
      return
    }
    let point = this.data.allPoints[curRound].point.split(':')
    this.setData({
      curPointA: Number(point[0]),
      curPointB: Number(point[1]),
      curProcedure: this.data.allPoints[curRound].procedure,
      startTime: this.data.allPoints[curRound].startTime
    })
    this.parseProcedure()
    this.judgeWinner()
  },

  teamAScore:function(e){
    if(this.data.curWinner != this.data.unKnownWinner){
      return
    }
    this.setData({
      curPointA: this.data.curPointA + 1,
      curProcedure: this.data.curProcedure + 'A'
    })
    this.recordPoints()
    this.judgeWinner()
    console.log(this.data.curProcedure)
  },

  teamBScore:function(e){
    if(this.data.curWinner != this.data.unKnownWinner){
      return
    }
    this.setData({
      curPointB: this.data.curPointB + 1,
      curProcedure: this.data.curProcedure + 'B'
    })
    this.recordPoints()
    this.judgeWinner()
    console.log(this.data.curProcedure)
  },

  chooseCurRound:function(e){
    console.log(e.currentTarget.dataset.index)
    this.recordPoints()
    this.setData({
      curRound: e.currentTarget.dataset.index
    })
    util.removeStorage("curRound")
    util.putStorage("curRound", this.data.curRound, storageTime)
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
      success: function(res){
        if(res.cancel){
          return
        }
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
      if(this.data.pauseTimeA >= 2){
        util.showMassage("暂停失败：次数不够")
        return
      }
      this.setData({
        pauseTimeA : this.data.pauseTimeA + 1,
        curProcedure: this.data.curProcedure + 'C'
      })
    }
    else{
      if(this.data.pauseTimeB >= 2){
        util.showMassage("暂停失败：次数不够")
        return
      }
      this.setData({
        pauseTimeB : this.data.pauseTimeB + 1,
        curProcedure: this.data.curProcedure + 'D'
      })
    }
    this.recordPoints()
    this.startTimeTicker(30)
  },

  exchangeButton: function(e){
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if(item == 'A'){
      if(this.data.exchangeTimeA >= 6){
        util.showMassage("换人失败：次数不够")
        return
      }
      this.setData({
        exchangeTimeA : this.data.exchangeTimeA + 1,
        curProcedure: this.data.curProcedure + 'E'
      })
    }
    else{
      if(this.data.exchangeTimeB >= 6){
        util.showMassage("换人失败：次数不够")
        return
      }
      this.setData({
        exchangeTimeB : this.data.exchangeTimeB + 1,
        curProcedure: this.data.curProcedure + 'F'
      })
    }
    this.recordPoints()
  },

  submitScore: function(e){
    var self = this
    wx.showModal({
      title: '提示',
      content: '是否确认提交？',
      success: function(res){
        if(res.cancel){
          return
        }
        self.recordPoints()
        util.showMassage("提交成功！")
        self.startTimeTicker(180)
        self.setData({
          curRound: self.data.curRound + 1
        })
        util.removeStorage("curRound")
        util.putStorage("curRound", self.data.curRound, storageTime)
        self.loadPoint()
      },
      fail:function(res){

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //util.removeStorage("curRound")
    //util.removeStorage("allPoints")
    this.loadPoint()
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