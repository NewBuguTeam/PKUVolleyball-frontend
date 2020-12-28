// pages/confirmPoints/confirmPoints.js
var app = getApp()
const util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxRound: 5,
    nameA: "信科",
    nameB: "医学",
    curRound: 1,
    curPointA: 0,
    curPointB: 0,
    allPoints: [],
    curDuration: "",
    showTimeTicker: false,
    minute:"00",
    second:"00",
    microSecond:"00",
    timer:null
  },

  ruleAction:function(){
    var that = this;
    that.setData({
      ruleDesImageHidden: false,
    })
 },

  recordPoints: function(){
    this.setData({
      'allPoints[curRound].value': curDuration
    })
  },

  teamAScore:function(e){
    this.setData({
      curPointA: this.data.curPointA + 1,
      curDuration: this.data.curDuration + 'A'
    })
    console.log(this.data.curDuration)
  },

  teamBScore:function(e){
    this.setData({
      curPointB: this.data.curPointB + 1,
      curDuration: this.data.curDuration + 'B'
    })
    console.log(this.data.curDuration)
  },

  chooseCurRound:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      curRound: e.currentTarget.dataset.index
    })
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
        curDuration: this.data.curDuration + 'C'
      })
    }
    else{
      this.setData({
        pauseTimeA : this.data.pauseTimeB + 1,
        curDuration: this.data.curDuration + 'D'
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
        util.showMassage("提交成功！")
        self.startTimeTicker(180)
        self.setData({
          curRound: self.data.curRound + 1,
          curPointA: 0,
          curPointB: 0
        })
      },
      fail:function(res){

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